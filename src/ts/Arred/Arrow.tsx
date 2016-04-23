namespace Arred {
    const unitWidth = 128;
    const unitHeight = 64;

    const detailSize = 32;

    export interface Arrow {
        haskell: string;
        svg: JSX.Element;
        width: number;
        height: number;
    }

    export function whiteBoxSVG(c: Arrow, x: number, y: number): JSX.Element {
        const absX = x * unitWidth;
        const absY = y * unitHeight;
        return <g transform={'translate(' + absX + ',' + absY + ')'}>
            <title>{c.haskell}</title>
            <rect
                x={0}
                y={0}
                width={c.width * unitWidth}
                height={c.height * unitHeight}
                stroke='transparent'
            />
            {c.svg}
        </g>;
    }

    export const voidArrow: Arrow = {
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

    export const zeroArrow: Arrow = {
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

    export class CustomArrow implements Arrow {
        constructor(public haskell: string) { }

        get svg(): JSX.Element {
            return <g>
                <line
                    x1={0}
                    y1={unitHeight / 2}
                    x2={unitWidth * 2}
                    y2={unitHeight / 2}
                />
                <rect
                    x={unitWidth / 4}
                    y={0}
                    width={unitWidth * 1.5}
                    height={unitHeight}
                />
                <text
                    x={unitWidth / 4 + 8}
                    y={20}
                    fill='black'
                    strokeWidth={0}
                    fontFamily='Consolas'
                >
                    {this.haskell}
                </text>
            </g>;
        }

        get width(): number {
            return 2;
        }

        get height(): number {
            return 1;
        }
    }

    export class CompositionArrow implements Arrow {
        constructor(private from: Arrow, private to: Arrow) { }

        get haskell(): string {
            return '(' + this.from.haskell + ') >>> (' + this.to.haskell + ')';
        }

        get svg(): JSX.Element {
            return <g>
                {whiteBoxSVG(this.from, 0, this.height / 2 - this.from.height / 2)}
                {whiteBoxSVG(this.to, this.from.width, this.height / 2 - this.to.height / 2)}
            </g>;
        }

        get width(): number {
            return this.from.width + this.to.width;
        }

        get height(): number {
            return Math.max(this.from.height, this.to.height);
        }
    }

    abstract class CombinatorArrow implements Arrow {
        constructor(private left: Arrow, private right: Arrow) { }

        protected combinator: string;

        get haskell(): string {
            return '(' + this.left.haskell + ') '
                 + this.combinator
                 + ' (' + this.right.haskell + ')';
        }

        get svg(): JSX.Element {
            const leftX = this.width - 1 - this.left.width;
            const rightX = this.width - 1 - this.right.width;
            const combX = this.width * unitWidth - unitWidth / 2;
            const combY = this.left.height * unitHeight + unitHeight / 2;
            return <g>
                <line
                    x1={0}
                    y1={this.height * unitHeight / 2}
                    x2={unitWidth / 2}
                    y2={this.height * unitHeight / 2}
                />

                <line
                    x1={unitWidth / 2}
                    y1={this.height * unitHeight / 2}
                    x2={unitWidth}
                    y2={this.left.height * unitHeight / 2}
                />
                <line
                    x1={unitWidth}
                    y1={this.left.height * unitHeight / 2}
                    x2={leftX * unitWidth}
                    y2={this.left.height * unitHeight / 2}
                />

                <line
                    x1={unitWidth / 2}
                    y1={this.height * unitHeight / 2}
                    x2={unitWidth}
                    y2={(this.left.height + 1 + this.right.height / 2) * unitHeight}
                />
                <line
                    x1={unitWidth}
                    y1={(this.left.height + 1 + this.right.height / 2) * unitHeight}
                    x2={rightX * unitWidth}
                    y2={(this.left.height + 1 + this.right.height / 2) * unitHeight}
                />

                {whiteBoxSVG(this.left, leftX, 0)}
                {whiteBoxSVG(this.right, rightX, this.left.height + 1)}

                <line
                    x1={(this.width - 1) * unitWidth}
                    y1={this.left.height * unitHeight / 2}
                    x2={combX}
                    y2={combY}
                />
                <line
                    x1={(this.width - 1) * unitWidth}
                    y1={(this.left.height + 1) * unitHeight + this.right.height * unitHeight / 2}
                    x2={combX}
                    y2={combY}
                />

                <circle cx={combX} cy={combY} r={detailSize / 2} />
                <text
                    x={combX}
                    y={combY}
                    fill='black'
                    strokeWidth={0}
                    fontFamily='Consolas'
                    textAnchor='middle'
                    dominantBaseline='central'
                    fontSize='12px'
                >
                    {this.combinator}
                </text>

                <line
                    x1={combX + detailSize / 2}
                    y1={combY}
                    x2={this.width * unitWidth}
                    y2={combY}
                />
            </g>;
        }

        get width(): number {
            return Math.max(this.left.width, this.right.width) + 2;
        }

        get height(): number {
            return this.left.height + 1 + this.right.height;
        }
    }

    export class PlusArrow extends CombinatorArrow {
        get combinator(): string {
            return '<+>';
        }
    }

    export class SplitArrow extends CombinatorArrow {
        get combinator(): string {
            return '***';
        }
    }

    export class FanoutArrow extends CombinatorArrow {
        get combinator(): string {
            return '&&&';
        }
    }
}
