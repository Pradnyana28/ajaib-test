import { Sorting } from "../components/CustomTable";
import { FILTER_DEFAULT_VALUE } from "../components/SearchAndFilter/SearchAndFilter";
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
    filterValue: FILTER_DEFAULT_VALUE
};

const [ctx, provider] = createCustomContext(customTableInitialValues);

export const CustomTableContext = ctx;
export const CustomTableProvider = provider;
