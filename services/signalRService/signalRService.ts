import { useState, useEffect, useCallback } from "react";
import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from "@microsoft/signalr";
import { useSetRecoilState } from "recoil";
import { notificationList as ANotificationList } from "@/app/utilities/home/atoms/atom";
import { INotificationItem } from "@/app/utilities/notification/types/types";

export const useSignalR = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const setNotificationList = useSetRecoilState(ANotificationList); // ✅ Recoil State for Notifications

  const connectHub = useCallback(async (apiUrl: string, userId: string) => {
    console.log("🔌 Connecting to SignalR...", apiUrl, userId);
    
    setIsLoading(true);
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
      console.log("❌ SignalR connection closed:", err);
    });

    setConnection(newConnection);

    try {
      await newConnection.start();
      console.log("✅ SignalR connected successfully!");
      setupListeners(newConnection);
    } catch (err) {
      console.log("❌ Error establishing SignalR connection:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setupListeners = useCallback((connection: HubConnection) => {
    connection.on("ReceiveUpdate", (message) => {
      const { type, data } = message;
      console.log(`📩 New message on ${type}:`, data);
      
      if (type === "NotificationListUpdate") {
        setNotificationList((current) => [...current, data as INotificationItem]); // ✅ Update Recoil State
      }
    });
  }, [setNotificationList]);

  useEffect(() => {
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection]);

  return { connectHub, isLoading };
};
