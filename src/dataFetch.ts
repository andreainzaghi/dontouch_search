import { ref } from 'vue';
import { DataItem, SortKeys } from './types';

export const data = ref<DataItem[]>([]);

export const fetchData = async (
    currentPage: number,
    itemsPerPage: number,
    searchQuery: string,
    selectedCategory: string,
    sortOption: SortKeys
) => {
    try {
        const params = new URLSearchParams({
            page: currentPage.toString(),
            limit: itemsPerPage.toString(),
            search: searchQuery,
            category: selectedCategory,
            sort: sortOption,
        });

        const response = await fetch(`http://127.0.0.1:5000/data?${params.toString()}`);
        console.log('HTTP Response', response);  // Aggiungi questa linea

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        console.log('JSON Data', jsonData);  // Aggiungi questa linea
        data.value = jsonData;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};