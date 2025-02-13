import { useState, useEffect, useCallback } from "react";
import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from "@microsoft/signalr";
import { useSetRecoilState } from "recoil";
import { notificationList as ANotificationList } from "@/app/utilities/home/atoms/atom";
import { INotificationItem } from "@/app/utilities/notification/types/types";

export const useSignalR = (apiUrl: string, userId: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const setNotificationList = useSetRecoilState(ANotificationList); // ✅ Recoil State for Notifications

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${apiUrl}baseHub`, {
        accessTokenFactory: () => userId,
        transport: HttpTransportType.WebSockets, // ✅ Use WebSockets
        skipNegotiation: true,                  // ✅ Fix negotiation failure
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    newConnection.onclose((err) => {
      console.error("❌ SignalR connection closed:", err);
    });

    setConnection(newConnection);

    return () => {
      newConnection.stop();
    };
  }, [apiUrl, userId]);

  const startConnection = useCallback(async () => {
    if (!connection) return;
    try {
      await connection.start();
      console.log("✅ SignalR connected successfully!");
      setupListeners();
    } catch (err) {
      console.error("❌ Error establishing SignalR connection:", err);
    }
  }, [connection]);

  const setupListeners = useCallback(() => {
    if (!connection) return;

    connection.on("ReceiveUpdate", (message) => {
      const { type, data } = message;
      console.log(`📩 New message on ${type}:`, data);
      
      if (type === "NotificationListUpdate") {
        setNotificationList((current) => [...current, data as INotificationItem]); // ✅ Update Recoil State
      }
    });
  }, [connection, setNotificationList]);

  useEffect(() => {
    if (connection) {
      startConnection();
    }
  }, [connection, startConnection]);

  return { connection };
};
