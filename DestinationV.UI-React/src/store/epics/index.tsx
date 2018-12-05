import { combineEpics } from "redux-observable";
import  routesLoadEpic  from '../../routes-module/store/epics/route.epic';
const epics = combineEpics(
    ...routesLoadEpic
);

export default epics;
