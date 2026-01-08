import {api} from "./axios";

export async function getClubs(){
    const res  = await api.get("/clubs");
    return res.data;
}

export async function createClub(payload: {name:string, country:string}){
    const res = await api.post("/clubs", payload);
    return res.data;
}

export async function assignClubAdmin(clubId: number, userId: number){
    const res = await api.post("/clubs/assign-admin", { clubId, userId });
    return res.data;
}

export async function getClubAdmins(clubId?: number){

    const res = await api.get("/clubs/club-admins", { params: { clubId } });
    return res.data;
}