import { useQuery } from "@tanstack/react-query";

export const getAnswer = () => {
    return useQuery({
        queryKey: ['getAnswer'],
        queryFn: async () => {
            try {
                const response = "chicken";
                console.log(response);
                return response;
            } catch (error) {
            }
        },
        enabled: false
    });
};