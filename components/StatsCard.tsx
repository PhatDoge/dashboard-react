import { calculateTrendPercentage, cn } from "lib/utils";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Category,
  DataLabel,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

const StatsCard = ({
  headerTitle,
  total,
  lastMonthCount,
  currentMonthCount,
}: StatsCard) => {
  const { trend, percentage } = calculateTrendPercentage(
    currentMonthCount,
    lastMonthCount
  );

  const isDecrement = trend === "decrement";

  // Sample data for the mini chart
  const chartData = [
    { x: "Jan", y: lastMonthCount },
    { x: "Feb", y: currentMonthCount },
  ];

  return (
    <article className="stats-card">
      <h3 className="text-base font-medium">{headerTitle}</h3>
      <div className="content">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">{total}</h2>
          <div className="flex items-center gap-2">
            <figure className="flex items-center gap-1">
              <img
                src={`/assets/icons/${
                  isDecrement ? "arrow-down-red.svg" : "arrow-up-green.svg"
                }`}
                className="size-5"
                alt="arrow"
              />
              <figcaption
                className={cn(
                  "text.sm font-medium",
                  isDecrement ? "text-red-500" : "text-success-700"
                )}
              >
                {Math.round(percentage)}%
              </figcaption>
            </figure>
            <p className="text-sm font-medium text-gray-100 truncate">
              vs el mes pasado
            </p>
          </div>
        </div>
        <div className="xl:w-32 w-full h-full md:h-32 xl:h-full">
          <ChartComponent
            primaryXAxis={{ valueType: "Category", visible: false }}
            primaryYAxis={{ visible: false }}
            height="100%"
            width="100%"
            tooltip={{ enable: true }}
            background="transparent"
          >
            <Inject services={[LineSeries, Category, DataLabel, Tooltip]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={chartData}
                xName="x"
                yName="y"
                type="Line"
                width={2}
                marker={{ visible: true, width: 4, height: 4 }}
                fill={isDecrement ? "#ef4444" : "#22c55e"}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    </article>
  );
};

export default StatsCard;
