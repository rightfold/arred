namespace Arred {
    import Map = Immutable.Map;
    import OrderedMap = Immutable.OrderedMap;
    import Set = Immutable.Set;

    interface Props { }

    interface State { }

    const computation =
        new PlusComputation(
            zeroArrowComputation,
            new PlusComputation(
                new CompositionComputation(
                    voidArrowComputation,
                    zeroArrowComputation
                ),
                voidArrowComputation
            )
        );

    export class CanvasView extends React.Component<Props, State> {
        render(): JSX.Element {
            return <div className='arred-canvas'>
                <svg xmlns='http://www.w3.org/2000/svg'>
                    <g
                        fill='transparent'
                        stroke='black'
                        strokeWidth={2}

                        transform='translate(32, 32)'
                    >
                        {whiteBoxSVG(computation, 0, 0)}
                    </g>
                </svg>
            </div>;
        }
    }
}
