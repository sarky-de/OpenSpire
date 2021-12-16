import { Component } from '../../../Core/ECS/Component';

export class BlockComponent extends Component {
    readonly type: string = 'BlockComponent';

    public block = 0;
}
