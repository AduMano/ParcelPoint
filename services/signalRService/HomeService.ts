import { useState, useEffect, useCallback } from "react";
import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from "@microsoft/signalr";
import { useSetRecoilState } from "recoil";
import { parcelList as AParcelList } from "@/app/utilities/home/atoms/atom";
import { notificationList as ANotificationList } from "@/app/utilities/home/atoms/atom";
import { HomeList, INotificationItem } from "@/app/utilities/notification/types/types";
import { TParcelDetail } from "@/app/utilities/home/types/type";
import useGetParcelList from "@/app/utilities/home/hooks/useGetParcelList";
import useGetNotificationList from "@/app/utilities/home/hooks/useGetNotificationList";

export const useHomeService = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const setNotificationList = useSetRecoilState(ANotificationList); // ✅ Recoil State for Notifications
  const setParcelList = useSetRecoilState(AParcelList); // ✅ Recoil State for Notifications

  const connectHub = useCallback(async (apiUrl: string, userId: string) => {
    console.log("🔌 Connecting to SignalR...");
    console.log("🔌 Connecting to SignalR...", apiUrl, userId);

    setIsLoading(true);
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${apiUrl}homeHub`, {
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
    connection.on("HomeListUpdate", (updateData: HomeList) => { 
      console.log(updateData);
      
      const parcel: TParcelDetail = updateData.parcel;
      const notification: INotificationItem = updateData.notification;

      setNotificationList((current) => [notification as INotificationItem, ...current]); 
      setParcelList((current) => [parcel as TParcelDetail, ...current]); 
    });

    connection.on("ParcelAndNotifUpdate", (updateData: HomeList) => {
      setUpdateFlag(true);
    });
  }, [setNotificationList, setParcelList]);

  useEffect(() => {
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection]);

  return { connectHub, isLoading, updateFlag, setUpdateFlag };
};
