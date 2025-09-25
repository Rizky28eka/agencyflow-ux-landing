import { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => ReactNode;
  className?: string;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  mobileCardRender?: (row: any, index: number) => ReactNode;
}

export const ResponsiveTable = ({ 
  columns, 
  data, 
  onRowClick, 
  mobileCardRender 
}: ResponsiveTableProps) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
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
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
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
                  {columns.slice(0, 3).map((column) => (
                    <div key={column.key} className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">{column.label}:</span>
                      <span className="font-medium">
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
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