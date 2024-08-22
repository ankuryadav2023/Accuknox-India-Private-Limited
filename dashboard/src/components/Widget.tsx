import { MouseEvent, memo, useEffect, useRef } from 'react';
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    BarController,
    BarElement,
    PieController,
    ArcElement,
    DoughnutController,
    ChartTypeRegistry,
    ChartData,
    Point,
    BubbleDataPoint
} from 'chart.js';
import randomColor from 'randomcolor';
import { StatesType, WidgetType } from '../assets/types';
import { useDispatch, useSelector } from 'react-redux';

Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    BarController,
    BarElement,
    PieController,
    ArcElement,
    DoughnutController
);

const Widget = (props: { categoryId: string, widget: WidgetType }) => {
    const categories = useSelector((states: StatesType) => states.categories);
    const dispatch = useDispatch();
    const chartRef = useRef<Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[]> | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const canvas = canvasRef.current;
        const ctx = canvasRef.current?.getContext('2d');
        if (!canvas) return;

        if (props.widget.data) {
            props.widget.data.datasets.forEach(dataset => {
                dataset.backgroundColor = randomColor({
                    count: dataset.data.length,
                    luminosity: 'light',
                    hue: 'random'
                });
            });
        }

        if (props.widget.data && props.widget.widgetType) {
            chartRef.current = new Chart(canvas as unknown as CanvasRenderingContext2D, {
                type: props.widget.widgetType as keyof ChartTypeRegistry,
                data: props.widget.data as ChartData<keyof ChartTypeRegistry>,
            });
        } else {
            const img = new Image();
            img.src = 'no-data-available-image.avif';
            img.onload = function () {
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        }

    }, [props.widget.widgetId, props.widget.widgetType, props.widget.data]);

    useEffect(() => {
        const wc = document.getElementById('widget-container-' + props.widget.widgetId) as HTMLDivElement;
        if (wc) {
            wc.style.display = props.widget.visibility ? 'block' : 'none';
        }
    }, [props.widget.widgetId, props.widget.visibility]);

    const hideWidget = (e: MouseEvent<HTMLSpanElement>) => {
        dispatch({
            type: 'UPDATECR', payload: categories.map(category => {
                if (category.categoryId === props.categoryId) {
                    category.widgets.map(widget => {
                        if (widget.widgetId === e.currentTarget.id.split('-')[1]) {
                            widget.visibility = !(widget.visibility);
                        }
                        return widget;
                    })
                }
                return category;
            })
        });
    }

    return (
        <div id={'widget-container-' + props.widget.widgetId} className='m-3 my-0 p-3 d-flex flex-column align-items-center widget-container rounded'>
            <div className='container d-flex justify-content-between align-items-center'>
                <h4>{props.widget.widgetName}</h4>
                <span id={'span-' + props.widget.widgetId} className="material-symbols-outlined cursor-pointer" onClick={hideWidget}>
                    close
                </span>
            </div>
            <canvas
                ref={canvasRef}
                width={200}
                height={150}
                id={'canvas-' + props.widget.widgetId}
            ></canvas>
        </div>
    );
}

export default memo(Widget);