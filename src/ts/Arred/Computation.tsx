namespace Arred {
    const unitWidth = 128;
    const unitHeight = 64;

    const detailSize = 32;

    export interface Computation {
        haskell: string;
        svg: JSX.Element;
        width: number;
        height: number;
    }

    export function whiteBoxSVG(c: Computation, x: number, y: number): JSX.Element {
        const absX = x * unitWidth;
        const absY = y * unitHeight;
        return <g transform={'translate(' + absX + ',' + absY + ')'}>
            <title>{c.haskell}</title>
            {c.svg}
        </g>;
    }

    export const voidArrowComputation: Computation = {
        haskell: 'arr $ const ()',
        svg: <g>
            <line
                x1={0}
                y1={unitHeight / 2}
                x2={unitWidth / 2 - detailSize / 2}
                y2={unitHeight / 2}
            />
            <line
                x1={unitWidth / 2 + detailSize / 2}
                y1={unitHeight / 2}
                x2={unitWidth}
                y2={unitHeight / 2}
            />
            <rect
                x={unitWidth / 2 - detailSize / 2}
                y={unitHeight / 2 - detailSize / 2}
                width={detailSize}
                height={detailSize}
                fill='black'
            />
        </g>,
        width: 1,
        height: 1,
    };

    export const zeroArrowComputation: Computation = {
        haskell: 'zeroArrow',
        svg: <g>
            <line
                x1={0}
                y1={unitHeight / 2}
                x2={unitWidth / 2 - detailSize / 2}
                y2={unitHeight / 2}
            />
            <line
                x1={unitWidth / 2 + detailSize / 2}
                y1={unitHeight / 2}
                x2={unitWidth}
                y2={unitHeight / 2}
            />
            <circle
                cx={unitWidth / 2}
                cy={unitHeight / 2}
                r={detailSize / 2}
            />
        </g>,
        width: 1,
        height: 1,
    };

    export class CompositionComputation implements Computation {
        constructor(private from: Computation, private to: Computation) { }

        get haskell(): string {
            return '(' + this.from.haskell + ') >>> (' + this.to.haskell + ')';
        }

        get svg(): JSX.Element {
            return <g>
                {whiteBoxSVG(this.from, 0, 0)}
                {whiteBoxSVG(this.to, this.from.width, 0)}
            </g>;
        }

        get width(): number {
            return this.from.width + this.to.width;
        }

        get height(): number {
            return Math.max(this.from.height, this.to.height);
        }
    }

    export class PlusComputation implements Computation {
        constructor(private left: Computation, private right: Computation) { }

        get haskell(): string {
            return '(' + this.left.haskell + ') <+> (' + this.right.haskell + ')';
        }

        get svg(): JSX.Element {
            const plusX = this.width * unitWidth - unitWidth / 2;
            const plusY = this.left.height * unitHeight + unitHeight / 2;
            return <g>
                {whiteBoxSVG(
                    this.left,
                    this.width - 1 - this.left.width,
                    0
                )}
                <line
                    x1={(this.width - 1) * unitWidth}
                    y1={this.left.height * unitHeight / 2}
                    x2={plusX}
                    y2={plusY}
                />
                <line
                    x1={(this.width - 1) * unitWidth}
                    y1={(this.left.height + 1) * unitHeight + this.right.height * unitHeight / 2}
                    x2={plusX}
                    y2={plusY}
                />
                <circle cx={plusX} cy={plusY} r={detailSize / 2} />
                <line x1={plusX - 8} y1={plusY} x2={plusX + 8} y2={plusY} />
                <line x1={plusX} y1={plusY - 8} x2={plusX} y2={plusY + 8} />
                <line
                    x1={plusX + detailSize / 2}
                    y1={plusY}
                    x2={this.width * unitWidth}
                    y2={plusY}
                />
                {whiteBoxSVG(
                    this.right,
                    this.width - 1 - this.right.width,
                    this.left.height + 1
                )}
            </g>;
        }

        get width(): number {
            return Math.max(this.left.width, this.right.width) + 1;
        }

        get height(): number {
            return this.left.height + 1 + this.right.height;
        }
    }
}
