import { Sorting } from "../components/CustomTable";
import { createCustomContext } from "./contextInitiator";

interface SortData {
    by: string;
    order: Sorting;
};

interface CustomTableContextProperties {
    page: number;
    searchValue: string | null;
    filterValue?: string;
    sort?: SortData;
}

const customTableInitialValues: CustomTableContextProperties = {
    page: 1,
    searchValue: null,
    filterValue: 'all'
};

const [ctx, provider] = createCustomContext(customTableInitialValues);

export const CustomTableContext = ctx;
export const CustomTableProvider = provider;
