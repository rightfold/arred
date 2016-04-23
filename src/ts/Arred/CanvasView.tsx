namespace Arred {
    import Map = Immutable.Map;
    import OrderedMap = Immutable.OrderedMap;
    import Set = Immutable.Set;

    interface Props { }

    interface State { }

    const arrow =
        new CompositionArrow(
            new CompositionArrow(
                new PlusArrow(
                    new PlusArrow(
                        new CompositionArrow(
                            voidArrow,
                            zeroArrow
                        ),
                        voidArrow
                    ),
                    new PlusArrow(
                        new CompositionArrow(
                            new CustomArrow('arr $ map cube'),
                            zeroArrow
                        ),
                        voidArrow
                    )
                ),
                new PlusArrow(
                    new PlusArrow(
                        new CompositionArrow(
                            new CustomArrow('arr $ map square'),
                            zeroArrow
                        ),
                        voidArrow
                    ),
                    new PlusArrow(
                        new CompositionArrow(
                            voidArrow,
                            zeroArrow
                        ),
                        voidArrow
                    )
                )
            ),
            new CustomArrow('Kleisli putStrLn')
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
