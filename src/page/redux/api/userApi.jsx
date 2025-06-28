import { baseApi } from "./baseApi";


const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),

     getAllUser: builder.query({
      query: () => {
        return {
          url: "/api/dashboard/user-management/getAllUsers",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getProfile: builder.query({
      query: () => {
        return {
          url: "/admin/profile",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAdmin: builder.query({
      query: () => {
        return {
          url: "/api/dashboard/admins",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    makeAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/api/dashboard/make-admin",
          method: "POST",
          body: data,
        };
      },
       invalidatesTags: ["updateProfile"],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => {
        return {
          url: `/api/dashboard/admin/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['updateProfile']
    }),


    forgotPassword: builder.mutation({
      query: (email) => {
        return {
          url: "/api/auth/forgot-password",
          method: "POST",
          body: email,
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/verify-code",
          method: "POST",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/api/auth/reset-password",
          method: "PUT",
          body: data,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/edit-profile",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/change-password",
          method: "PUT",
          body: data,
        };
      },
    }),
    getHostUser: builder.query({
      query: ({ user, page, search }) => {
        return {
          url: `/dashboard/get-all-user?role=${user}&page=${page}&searchTerm=${search}`,
          method: "GET",
        };

      },
      providesTags: ["host"],
    }),

    blockUser: builder.mutation({
      query: (id) => ({
        url: `/api/dashboard/user-management/blockUser/${id}`,
        method: "PUT",
        // body: data,
      }),
      invalidatesTags: ["updateProfile"],
    }),
     unblockUser: builder.mutation({
      query: (id) => ({
        url: `/api/dashboard/user-management/unBlockUser/${id}`,
        method: "PUT",
        // body: data,
      }),
      invalidatesTags: ["updateProfile"],
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useGetProfileQuery,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetHostUserQuery,
useBlockUserMutation,
useUnblockUserMutation,
  useGetAdminQuery,
  useMakeAdminMutation,
  useDeleteAdminMutation,
  useGetAllUserQuery
} = useApi;
