import { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

interface Column<TData extends Record<string, unknown>> {
  key: string;
  label: string;
  render?: (value: any, row: TData) => ReactNode;
  className?: string;
}

interface ResponsiveTableProps<TData extends Record<string, unknown>> {
  columns: Column<TData>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  mobileCardRender?: (row: TData, index: number) => ReactNode;
}

export const ResponsiveTable = <TData extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  mobileCardRender
}: ResponsiveTableProps<TData>) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, colIndex) => (
                <TableHead key={colIndex} className={column.className}>
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow 
                key={index} 
                className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className={column.className}>
                    {column.render ? column.render(row[column.key as keyof TData], row) : String(row[column.key as keyof TData] || '')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-4">
        {data.map((row, index) => (
          <div key={index} onClick={() => onRowClick?.(row)}>
            {mobileCardRender ? (
              mobileCardRender(row, index)
            ) : (
              <Card className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}>
                <CardContent className="p-4">
                  {columns.slice(0, 3).map((column, colIndex) => (
                    <div key={colIndex} className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">{column.label}:</span>
                      <span className="font-medium">
                        {column.render ? column.render(row[column.key as keyof TData], row) : String(row[column.key as keyof TData] || '')}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
    </>
  );
};