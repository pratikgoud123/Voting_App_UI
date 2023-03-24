import { User } from 'src/app/model/User';

export type loginResponse = {
    user?: User;
    sercretKey?: any;
}