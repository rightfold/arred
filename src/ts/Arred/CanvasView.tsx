namespace Arred {
    import Map = Immutable.Map;
    import OrderedMap = Immutable.OrderedMap;
    import Set = Immutable.Set;

    interface Props { }

    interface State { }

    const arrow =
        new CompositionArrow(
            new CompositionArrow(
                new FanoutArrow(
                    new CustomArrow('f'),
                    new CustomArrow('g')
                ),
                new CustomArrow('arr (uncurry (+))')
            ),
            new PlusArrow(zeroArrow, voidArrow)
        );

    export class CanvasView extends React.Component<Props, State> {
        render(): JSX.Element {
            return <div className='arred-canvas'>
                <svg xmlns='http://www.w3.org/2000/svg'>
                    <g
                        fill='white'
                        stroke='black'
                        strokeWidth={2}

                        transform='translate(32, 32)'
                    >
                        {whiteBoxSVG(arrow, 0, 0)}
                    </g>
                </svg>
            </div>;
        }
    }
}
