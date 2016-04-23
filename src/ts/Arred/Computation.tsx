namespace Arred {
    export interface Computation {
        svg: JSX.Element;
    }

    export const identityComputation = {
        svg: <line x1={0} y1={64 / 2} x2={128} y2={64 / 2} />,
    };

    export const voidComputation = {
        svg: <g>
            <line x1={0} y1={64 / 2} x2={128} y2={64 / 2} />
            <rect
                x={128 / 2 - 16}
                y={64 / 2 - 16}
                width={32}
                height={32}
                fill="black"
            />
        </g>,
    };

    export class CustomComputation implements Computation {
        constructor(private source: string) { }

        get svg(): JSX.Element {
            return <g>
                <rect x={0} y={0} width={128} height={64} />
                <text
                    x={8}
                    y={21}

                    fontFamily="Consolas"

                    fill="black"
                    strokeWidth="0"
                >
                    {this.source}
                </text>
            </g>;
        }
    }
}
