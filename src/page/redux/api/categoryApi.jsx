import { baseApi } from "./baseApi";

const setting = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        getCategory: builder.query({
            query: () => {
                return {
                    url: `/api/dashboard/allcategory/all`,
                    method: "GET",
                };
            },
            providesTags: ["updateProfile"],
        }),

          getMetaData: builder.query({
            query: () => {
                return {
                    url: `/api/dashboard/home/stats`,
                    method: "GET",
                };
            },
            providesTags: ["updateProfile"],
        }),

        getMetaChart: builder.query({
            query: ({year}) => {
                return {
                    url: `/api/dashboard/home/charts?year=${year}`,
                    method: "GET",
                };
            },
            providesTags: ["updateProfile"],
        }),

        addCategory: builder.mutation({
            query: (data) => {
                return {
                    url: "/api/dashboard/allcategory/create",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["updateProfile"],
        }),


        updateCategory: builder.mutation({
            query: ({ data, id }) => {
                return {
                    url: `/api/dashboard/allcategory/update/${id}`,
                    method: "PUT",
                    body: data,
                };
            },
            invalidatesTags: ["updateProfile"],
        }),


        deleteCategory: builder.mutation({
            query: (id) => {
                return {
                    url: `/api/dashboard/allcategory/delete/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['updateProfile']
        }),


        addSubscription: builder.mutation({
            query: (data) => {
                return {
                    url: "/api/dashboard/subscription/create",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["updateProfile"],
        }),

        addContact: builder.mutation({
            query: (data) => {
                return {
                    url: "/api/dashboard/settings/contact-us/create",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["updateProfile"],
        }),
        getContact: builder.query({
            query: () => {
                return {
                    url: `/api/dashboard/settings/contact-us/get`,
                    method: "GET",
                };
            },
            providesTags: ["updateProfile"],
        }),

        getSubscription: builder.query({
            query: () => {
                return {
                    url: `/api/dashboard/subscription/get-all`,
                    method: "GET",
                };
            },
            providesTags: ["updateProfile"],
        }),

        deleteSubscription: builder.mutation({
            query: (id) => {
                return {
                    url: `/api/dashboard/subscription/delete/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['updateProfile']
        }),


        updateSubscription: builder.mutation({
            query: ({ data, id }) => {
                return {
                    url: `/api/dashboard/subscription/update/${id}`,
                    method: "PUT",
                    body: data,
                };
            },
            invalidatesTags: ["updateProfile"],
        }),


        getPrivecy: builder.query({
            query: () => {
                return {
                    url: `/api/dashboard/settings/privacy-policy/get`,
                    method: "GET",
                };
            },
            providesTags: ["updateProfile"],
        }),

        addPrivecy: builder.mutation({
            query: (data) => {
                return {
                    url: "/api/dashboard/settings/privacy-policy/create",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["updateProfile"],
        }),


         getTerms: builder.query({
            query: () => {
                return {
                    url: `/api/dashboard/settings/terms-conditions/get`,
                    method: "GET",
                };
            },
            providesTags: ["updateProfile"],
        }),

        addTerms: builder.mutation({
            query: (data) => {
                return {
                    url: "/api/dashboard/settings/terms-conditions/create",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["updateProfile"],
        }),
        //     addPrivacy: builder.mutation({
        //       query: (data) => {
        //         return {
        //           url: "/dashboard/addupdate-privacy-policy",
        //           method: "POST",
        //           body: data,
        //         };
        //       },
        //       invalidatesTags: ["updateProfile"],
        //     }),

        //     getPrivacy: builder.query({
        //       query: () => {
        //         return {
        //           url: `/dashboard/get-privacy-policy`,
        //           method: "GET",
        //         };
        //       },
        //       providesTags: ["updateProfile"],
        //     }),

        //     getAllAdd: builder.query({
        //       query: ({page,limit}) => {
        //         return {
        //           url: `/dashboard/all-adds?page=${page}&limit=${limit}`,
        //           method: "GET",
        //         };
        //       },
        //       providesTags: ["updateProfile"],
        //     }),

        //     addAdd: builder.mutation({
        //       query: (data) => {
        //         return {
        //           url: "/dashboard/create-adds",
        //           method: "POST",
        //           body: data,
        //         };
        //       },
        //       invalidatesTags: ["updateProfile"],
        //     }),

        //     deleteAdd :  builder.mutation({
        //       query : (id)=>{
        //           return {
        //               url : `/dashboard/delete-adds/${id}`,
        //               method : 'DELETE'
        //           }
        //       },
        //       invalidatesTags :['updateProfile']
        //   }),


        //   updateAdd: builder.mutation({
        //     query: ({data,id}) => {
        //       return {
        //         url: `/dashboard/edit-adds/${id}`,
        //         method: "PATCH",
        //         body: data,
        //       };
        //     },
        //     invalidatesTags: ["updateProfile"],
        //   }),


    }),
});

export const {
    useGetCategoryQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useGetSubscriptionQuery,
    useAddSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useUpdateSubscriptionMutation,
    useAddContactMutation,
    useGetContactQuery,
    useUpdateCategoryMutation,
    useAddPrivecyMutation,
    useGetPrivecyQuery,
    useGetTermsQuery,
    useGetMetaChartQuery,
    useGetMetaDataQuery,
    useAddTermsMutation

} = setting;
