namespace Arred {
    interface Props { }

    interface State { }

    export class MainView extends React.Component<Props, State> {
        render(): JSX.Element {
            return <div className='arred-main'>
                <ToolbarView />
                <CanvasView />
            </div>;
        }
    }
}
