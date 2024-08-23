"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getBank, getBankByAccountId } from "@/actions/bank";
import { createTransfer } from "@/actions/dwolla";
import { createTransaction } from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { paymentTransferDefaultValues } from "@/lib/constants";
import { formatAmount, formUrlQuery } from "@/lib/utils";
import { paymentTransferFormSchema } from "@/lib/validations";

interface Props {
  accounts: Account[];
}

export const PaymentTransferForm = ({ accounts }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);

  const { toast } = useToast();

  const router = useRouter();
  const searchParams = useSearchParams();

  const formSchema = paymentTransferFormSchema;
  const defaultValues = paymentTransferDefaultValues(selectedAccount.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const receiver = await getBankByAccountId({
        accountId: atob(values.receiverBank),
      });

      const sender = await getBank({ documentId: values.senderBank });

      const transfer = await createTransfer({
        amount: values.amount,
        destinationFundingSourceUrl: receiver?.fundingSourceUrl,
        sourceFundingSourceUrl: sender?.fundingSourceUrl,
      });

      if (transfer) {
        const transaction = await createTransaction({
          name: values.note!,
          amount: values.amount.slice(1),
          senderId: sender?.userId.$id,
          senderBankId: sender?.$id!,
          receiverId: receiver?.userId.$id,
          receiverBankId: receiver?.$id!,
          email: values.email,
        });

        if (transaction) {
          form.reset();

          router.push("/");
        }
      }
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    setIsLoading(false);
  };

  const handleBankChange = (id: string) => {
    const account = accounts.find((account) => account.appwriteItemId === id);

    setSelectedAccount(account!);

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: id,
    });

    router.push(newUrl, { scroll: false });

    form.setValue("senderBank", id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col gap-1 pb-5 pt-6">
          <h2 className="text-lg leading-[22px] font-semibold text-gray-900">
            Transfer details
          </h2>
          <p className="text-sm font-normal text-gray-600">
            Enter the details of the recipient
          </p>
        </div>
        <FormField
          control={form.control}
          name="senderBank"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Select Source Bank
                  </FormLabel>
                  <FormDescription className="text-xs font-normal text-gray-600">
                    Select the bank account you want to transfer funds from
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Select
                      defaultValue={selectedAccount.id}
                      onValueChange={(value) => handleBankChange(value)}
                    >
                      <SelectTrigger
                        className="!w-full flex bg-white gap-3 md:w-[300px]"
                        disabled={isLoading}
                      >
                        <Image
                          src="icons/credit-card.svg"
                          height={20}
                          width={20}
                          alt="credit card"
                        />
                        <p className="line-clamp-1 w-full text-left">
                          {selectedAccount.name}
                        </p>
                      </SelectTrigger>
                      <SelectContent
                        className="!w-full bg-white md:w-[300px]"
                        align="end"
                      >
                        <SelectGroup>
                          <SelectLabel className="py-2 font-normal text-gray-500">
                            Select a bank to display
                          </SelectLabel>
                          {accounts.map((account) => (
                            <SelectItem
                              key={account.id}
                              value={account.appwriteItemId}
                              className="cursor-pointer border-t"
                            >
                              <div className="flex flex-col ">
                                <p className="text-base font-medium">
                                  {account.name}
                                </p>
                                <p className="text-sm font-medium text-blue-600">
                                  {formatAmount(account.currentBalance)}
                                </p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Transfer Note (Optional)
                  </FormLabel>
                  <FormDescription className="text-xs font-normal text-gray-600">
                    Please provide any additional information or instructions
                    related to the transfer
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Textarea
                      className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                </div>
              </div>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-1 border-t border-gray-200 pb-5 pt-6">
          <h2 className="text-lg leading-[22px] font-semibold text-gray-900">
            Bank account details
          </h2>
          <p className="text-sm font-normal text-gray-600">
            Enter the bank account details of the recipient
          </p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Recipient&apos;s Email Address
                  </FormLabel>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Enter the email address"
                      className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-2" />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="receiverBank"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Receiver&apos;s Bank Account Number
                  </FormLabel>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Enter the account number"
                      className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-2" />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Amount
                  </FormLabel>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Enter the amount"
                      className="text-base placeholder:text-base rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                      disabled={isLoading}
                      onChange={(e) => {
                        let value = e.target.value;

                        value = value.replace(/[^0-9.]/g, "");

                        const parts = value.split(".");

                        if (parts.length > 2) {
                          value = `${parts[0]}.${parts[1]}`;
                        }

                        if (value && !isNaN(Number(value))) {
                          const [integerPart, decimalPart] = value.split(".");

                          if (decimalPart?.length > 2) {
                            value = `${integerPart}.${decimalPart.slice(0, 2)}`;
                          }
                        }

                        field.onChange(value);
                      }}
                      onBlur={() => {
                        const formattedValue = Number(
                          parseFloat(field.value).toFixed(2)
                        );

                        if (!isNaN(formattedValue)) {
                          field.onChange(
                            new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(formattedValue)
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-2" />
                </div>
              </div>
            </FormItem>
          )}
        />
        <div className="flex w-full max-w-[850px] gap-3 border-gray-200 py-5">
          <Button
            type="submit"
            className="text-base w-full bg-gradient-to-r from-[#0179FE] to-[#4893FF] font-semibold text-white shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
