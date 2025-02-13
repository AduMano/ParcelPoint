import { useState, useEffect, useCallback } from "react";
import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from "@microsoft/signalr";
import { useSetRecoilState } from "recoil";
import { parcelList as AParcelList } from "@/app/utilities/home/atoms/atom";
import { notificationList as ANotificationList } from "@/app/utilities/home/atoms/atom";
import { HomeList, INotificationItem } from "@/app/utilities/notification/types/types";
import { TParcelDetail } from "@/app/utilities/home/types/type";

export const useHomeService = (apiUrl: string, userId: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const setNotificationList = useSetRecoilState(ANotificationList); // ✅ Recoil State for Notifications
  const setParcelList = useSetRecoilState(AParcelList); // ✅ Recoil State for Notifications

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${apiUrl}notificationHub`, {
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
      console.log("❌ Error establishing SignalR connection:", err);
    }
  }, [connection]);

  const setupListeners = useCallback(() => {
    if (!connection) return;

    connection.on("HomeListUpdate", (updateData: HomeList) => { 
      const parcel: TParcelDetail = updateData.parcel;
      const notification: INotificationItem = updateData.notification;

      setNotificationList((current) => [notification as INotificationItem, ...current]); 
      setParcelList((current) => [parcel as TParcelDetail, ...current]); 
    });
  }, [connection, setNotificationList]);

  useEffect(() => {
    if (connection) {
      startConnection();
    }
  }, [connection, startConnection]);

  return { connection };
};
