import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: "e6c96876-47ff-4d5a-b820-a4b0caca49c6"
})


export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 10) => {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`, {withCredentials: true})
            .then(response => {
                return response.data
            })
    },
    authMe: () => {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login: (email, password, rememberMe = false) => {
      return instance.post(`auth/login`, {email, password, rememberMe})
          .then(response => {
              return response.data
          })
    },
    logout: () => {
        return instance.delete(`auth/login`);
    },
    unfollow: (userId) => {
        return instance.delete(`follow/${userId}`);
    },
    follow: (userId) => {
        return instance.post(`follow/${userId}`, null);
    },
    getProfile: (userId) => {
        return profileAPI.getProfile(userId)
            .then(response => {
                return response.data;
            })
    },
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}