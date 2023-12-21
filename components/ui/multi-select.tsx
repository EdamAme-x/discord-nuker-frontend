import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type OptionType = {
	label: string;
	value: string;
};

interface MultiSelectProps {
	options: OptionType[];
	selected: string[];
	onChange: React.Dispatch<React.SetStateAction<string>>;
	className?: string;
	max?: number;
}

function MultiSelect({ options, selected, onChange, className, max, ...props }: MultiSelectProps) {
	const [open, setOpen] = React.useState(false);

	const handleUnselect = (item: string) => {
		onChange(selected.filter(i => i == item)[0]);
	};

	return (
		<Popover open={open} onOpenChange={setOpen} {...props}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={`w-full justify-between ${selected.length > 1 ? "h-full" : "h-10"}`}
					onClick={() => setOpen(!open)}>
					<div className="flex gap-1 flex-wrap">
						{selected.slice(0, (max ?? 4)).map(item => (
							<Badge variant="secondary" key={item} className="mr-1 mb-1">
								{item.length > 8 ? item.substring(0, 7) + "..." : item}
								<button
									className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
									onKeyDown={e => {
										if (e.key === "Enter") {
											handleUnselect(item);
										}
									}}
									onMouseDown={e => {
										e.preventDefault();
										e.stopPropagation();
									}}
									onClick={(event: any) => {
										handleUnselect(item);
										event.stopPropagation();
									}}>
									<X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
								</button>
							</Badge>
						))}
						{selected.length > (max ?? 4) && (
							<Badge variant="secondary" className="mr-1 mb-1">
								...
							</Badge>
						)}
					</div>
					<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command className={className}>
					<CommandInput placeholder="Search ..." />
					<CommandEmpty>No item found.</CommandEmpty>
					<CommandGroup className="max-h-64 overflow-auto">
						{options.map(option => (
							<CommandItem
								key={option.value}
								onSelect={() => {
									onChange(
										// @ts-ignore NOTE: LIB SIDE ERROR
										selected.includes(option.value)
											? selected.filter(item => item !== option.value)
											: [...selected, option.value]
									);
									setOpen(true);
								}}>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										selected.includes(option.value) ? "opacity-100" : "opacity-0"
									)}
								/>
								{option.label.length > 8 ? option.label.substring(0, 7) + "..." : option.label}
								<X
									onKeyDown={e => {
										if (e.key === "Enter") {
											handleUnselect(option.value);
										}
									}}
									onMouseDown={e => {
										e.preventDefault();
										e.stopPropagation();
									}}
									onClick={(event: any) => {
										handleUnselect(option.value);
										event.stopPropagation();
									}}
									className="h-3 w-3 text-muted-foreground hover:text-foreground ml-auto"
								/>
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export { MultiSelect };
