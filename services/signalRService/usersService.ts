// import { IUserInformation } from '@/app/utilities/home/types/type';
// import { SignalRService } from './signalRService';

// // Atoms
// import { userList as AUserList } from "@/app/utilities/home/atoms/atom";

// // Library
// import { useRecoilState } from 'recoil';

// // Recoils
// const [_, setUserList] = useRecoilState(AUserList);

// export class UsersService {
//   private signalRService: SignalRService;

//   constructor(apiUrl: string) {
//     // Instance
//     this.signalRService = SignalRService.getInstance(apiUrl);

//     // Listeners
//     this.signalRService.registerListener('UserListUpdate', this.UserListUpdate.bind(this));
//   }

//   private UserListUpdate(user: IUserInformation): void {
//     console.log('UserList update received:', user);
//     setUserList((current) => [...current, user]);
//   }

//   public cleanup(): void {
//     this.signalRService.removeListener('UserListUpdate', this.UserListUpdate);
//   }
// }