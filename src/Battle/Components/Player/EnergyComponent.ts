import { Component } from "../../../Core/ECS/Component";

export class EnergyComponent extends Component{
    static readonly type: string = "EnergyComponent";

    public energy: number = 4;
    public maxEnergy: number = 4;
}
