namespace Arred {
    const unitWidth = 128;
    const unitHeight = 64;

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
                x2={unitWidth / 2 - 16}
                y2={unitHeight / 2}
            />
            <line
                x1={unitWidth / 2 + 16}
                y1={unitHeight / 2}
                x2={unitWidth}
                y2={unitHeight / 2}
            />
            <rect
                x={unitWidth / 2 - 16}
                y={unitHeight / 2 - 16}
                width={32}
                height={32}
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
                x2={unitWidth / 2 - 16}
                y2={unitHeight / 2}
            />
            <line
                x1={unitWidth / 2 + 16}
                y1={unitHeight / 2}
                x2={unitWidth}
                y2={unitHeight / 2}
            />
            <circle
                cx={unitWidth / 2}
                cy={unitHeight / 2}
                r={16}
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
            return <g>
                {whiteBoxSVG(
                    this.left,
                    this.width - 1 - this.left.width,
                    0
                )}
                <line
                    x1={(this.width - 1) * unitWidth}
                    y1={this.left.height * unitHeight / 2}
                    x2={this.width * unitWidth - unitWidth / 2 - 16 - 16}
                    y2={this.left.height * unitHeight + unitHeight / 2}
                />
                <line
                    x1={(this.width - 1) * unitWidth}
                    y1={(this.left.height + 1) * unitHeight + this.right.height * unitHeight / 2}
                    x2={this.width * unitWidth - unitWidth / 2 - 16 - 16}
                    y2={this.left.height * unitHeight + unitHeight / 2}
                />
                <line
                    x1={this.width * unitWidth - unitWidth / 2 - 16 - 16}
                    y1={this.left.height * unitHeight + unitHeight / 2}
                    x2={this.width * unitWidth - unitWidth / 2 - 16}
                    y2={this.left.height * unitHeight + unitHeight / 2}
                />
                <circle
                    cx={this.width * unitWidth - unitWidth / 2}
                    cy={this.left.height * unitHeight + unitHeight / 2}
                    r={16}
                />
                <line
                    x1={this.width * unitWidth - unitWidth / 2 - 8}
                    y1={this.left.height * unitHeight + unitHeight / 2}
                    x2={this.width * unitWidth - unitWidth / 2 + 8}
                    y2={this.left.height * unitHeight + unitHeight / 2}
                />
                <line
                    x1={this.width * unitWidth - unitWidth / 2}
                    y1={this.left.height * unitHeight + unitHeight / 2 - 8}
                    x2={this.width * unitWidth - unitWidth / 2}
                    y2={this.left.height * unitHeight + unitHeight / 2 + 8}
                />
                <line
                    x1={this.width * unitWidth - unitWidth / 2 + 16}
                    y1={this.left.height * unitHeight + unitHeight / 2}
                    x2={this.width * unitWidth}
                    y2={this.left.height * unitHeight + unitHeight / 2}
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
