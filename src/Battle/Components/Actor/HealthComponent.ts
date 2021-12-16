import { Component } from '../../../Core/ECS/Component';

export class HealthComponent extends Component {
    readonly type: string = 'HealthComponent';

    public health = 10;
    public maxHealth = 10;
}
