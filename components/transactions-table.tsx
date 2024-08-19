import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
} from "@/lib/utils";

const categoryStyles = {
  "Food and Drink": {
    borderColor: "border-pink-600",
    backgroundColor: "bg-pink-500",
    textColor: "text-pink-700",
    chipBackgroundColor: "bg-inherit",
  },
  Payment: {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Bank Fees": {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  Transfer: {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7]",
  },
  Success: {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  Travel: {
    borderColor: "border-[#0047AB]",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  default: {
    borderColor: "",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
};

interface Props {
  transactions: Transaction[];
}

export const TransactionsTable = ({ transactions }: Props) => {
  return (
    <Table>
      <TableHeader className="bg-[#F9FAFB]">
        <TableRow>
          <TableHead className="text-center px-2">Transaction</TableHead>
          <TableHead className="text-center px-2">Amount</TableHead>
          <TableHead className="text-center px-2">Status</TableHead>
          <TableHead className="text-center px-2">Date</TableHead>
          <TableHead className="text-center px-2 max-md:hidden">
            Channel
          </TableHead>
          <TableHead className="text-center px-2 max-md:hidden">
            Category
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const status = getTransactionStatus(new Date(transaction.date));

          const amount = formatAmount(transaction.amount);

          return (
            <TableRow
              key={transaction.id}
              className={cn(
                transaction.type === "debit" || amount[0] === "-"
                  ? "bg-[#FFFBFA]"
                  : "bg-[#F6FEF9]"
              )}
            >
              <TableCell className="max-w-[250px]">
                <div className="flex items-center justify-center">
                  <h1 className="text-sm truncate font-semibold text-[#344054]">
                    {transaction.name}
                  </h1>
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  "font-semibold text-center",
                  transaction.type === "debit" || amount[0] === "-"
                    ? "text-[#f04438]"
                    : "text-[#039855]"
                )}
              >
                {transaction.type === "debit"
                  ? `-${amount}`
                  : transaction.type === "credit"
                  ? amount
                  : amount}
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <div
                  className={cn(
                    "flex items-center justify-center truncate w-fit gap-1 rounded-2xl border-[1.5px] py-[2px] pl-1.5 pr-2",
                    categoryStyles[status].borderColor,
                    categoryStyles[status].chipBackgroundColor
                  )}
                >
                  <div
                    className={cn(
                      "size-2 rounded-full",
                      categoryStyles[status].backgroundColor
                    )}
                  />
                  <p
                    className={cn(
                      "text-[12px] font-medium",
                      categoryStyles[status].textColor
                    )}
                  >
                    {status}
                  </p>
                </div>
              </TableCell>
              <TableCell className="min-w-32 text-center">
                {formatDateTime(new Date(transaction.date)).dateTime}
              </TableCell>
              <TableCell className="capitalize min-w-24 text-center">
                {transaction.paymentChannel}
              </TableCell>
              <TableCell className="flex items-center justify-center max-md:hidden">
                <div
                  className={cn(
                    "flex items-center justify-center truncate w-fit gap-1 rounded-2xl border-[1.5px] py-[2px] pl-1.5 pr-2",
                    categoryStyles[
                      transaction.category as keyof typeof categoryStyles
                    ].borderColor,
                    categoryStyles[
                      transaction.category as keyof typeof categoryStyles
                    ].chipBackgroundColor
                  )}
                >
                  <div
                    className={cn(
                      "size-2 rounded-full",
                      categoryStyles[
                        transaction.category as keyof typeof categoryStyles
                      ].backgroundColor
                    )}
                  />
                  <p
                    className={cn(
                      "text-[12px] font-medium",
                      categoryStyles[
                        transaction.category as keyof typeof categoryStyles
                      ].textColor
                    )}
                  >
                    {transaction.category}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
