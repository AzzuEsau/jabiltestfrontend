import IDirector from "./Idirector";
import IClassification from "./Iclassification";

export default interface IMovie {
    id: number;
    name: string;
    description: string;
    fKclassification: IClassification;
    fKdirector: IDirector;
    enabled: boolean;
}