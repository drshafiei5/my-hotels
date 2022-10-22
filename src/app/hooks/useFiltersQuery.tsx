import { useMemo, useCallback } from 'react'
import { useSearchParams } from "react-router-dom";


const parse = (x: any) => {
    if (!isNaN(parseFloat(x)) && isFinite(x)) return parseFloat(x);
    if (x.toLowerCase() === "true") return true;
    if (x.toLowerCase() === "false") return false;
    return x;
}

const useFiltersQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchFilters = useMemo(() => {
        const result = {} as any;

        searchParams.forEach((value, key, parent) => {
            result[key] = parent.getAll(key).length > 1 ?
                parent.getAll(key).map(x => parse(x)) : parse(value);
        });

        return result;
    }, [searchParams]);


    const clearFilter = useCallback((name: string) => {
        const newSearchFilters = { ...searchFilters };
        delete newSearchFilters[name];
        setSearchParams(newSearchFilters);
    }, [searchFilters]);


    const handleChangeFilter = useCallback((e: any) => {
        const { name, value } = e.target;
        if (value === false || value === 0) {
            return clearFilter(name);
        }

        const newFilter = { ...searchFilters, [name]: value };
        return setSearchParams(newFilter);
    }, [searchFilters]);

    const handleResetSearchFilters = useCallback(() => {
        setSearchParams({});
    }, [searchFilters]);

    return { searchFilters, handleChangeFilter, handleResetSearchFilters };
}


export default useFiltersQuery;