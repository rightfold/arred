namespace Arred {
    import Map = Immutable.Map;
    import OrderedMap = Immutable.OrderedMap;
    import Set = Immutable.Set;

    interface Props { }

    interface State { }

    const nodes = Map<string, Computation>([
        ['a', identityComputation],
        ['b', new CustomComputation('map square')],
        ['c', new CustomComputation('map cube')],
        ['d', new CustomComputation('map pow4')],
        ['e', new CustomComputation('uncurry zip')],
        ['f', voidComputation],
    ]);

    const connections = OrderedMap<string, Set<string>>([
        ['a', Set<string>(['b', 'c', 'd'])],
        ['b', Set<string>(['e'])],
        ['c', Set<string>(['e'])],
        ['d', Set<string>(['e'])],
        ['e', Set<string>(['f'])],
        ['f', Set<string>([])],
    ]);

    interface Pos { x: number; y: number; }
    let positions = Map<string, Pos>();
    function setPositions(id: string, x: number, y: number): void {
        if (!positions.has(id)) {
            positions = positions.set(id, {
                x: 64 + x * 256,
                y: 64 + y * 128,
            });
        }
        connections.get(id).toList().forEach((id, i) => setPositions(id, x + 1, y + i));
    }
    setPositions('a', 0, 0);

    export class CanvasView extends React.Component<Props, State> {
        render(): JSX.Element {
            return <div className='arred-canvas'>
                <svg xmlns="http://www.w3.org/2000/svg">
                    {nodes.entrySeq().map(([id, computation], i) =>
                        <g
                            key={id}

                            fill='transparent'
                            stroke='black'
                            strokeWidth={2}
                        >
                            <g transform={'translate(' + positions.get(id).x + ', ' + positions.get(id).y + ')'}>
                                {computation.svg}
                                <line
                                    x1={-32}
                                    y1={32}
                                    x2={0}
                                    y2={32}
                                />
                                <line
                                    x1={-8}
                                    y1={32 - 8}
                                    x2={0}
                                    y2={32}
                                />
                                <line
                                    x1={-8}
                                    y1={32 + 8}
                                    x2={0}
                                    y2={32}
                                />
                                <line
                                    x1={128}
                                    y1={32}
                                    x2={128 + 32}
                                    y2={32}
                                />
                            </g>
                            <g>
                                {connections.get(id).toList().map(targetId =>
                                    <line
                                        key={targetId}

                                        x1={positions.get(id).x + 128 + 32}
                                        y1={positions.get(id).y + 32}
                                        x2={positions.get(targetId).x - 32}
                                        y2={positions.get(targetId).y + 32}
                                    />
                                )}
                            </g>
                        </g>
                    )}
                </svg>
            </div>;
        }
    }
}
