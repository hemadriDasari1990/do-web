import moment from "moment";

export default function converToSeconds(time: string): any {
    if(!time){
        return 0;
    }
    return moment.duration(time).asSeconds();
};