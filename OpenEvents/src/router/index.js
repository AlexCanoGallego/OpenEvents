import { createRouter, createWebHistory } from "vue-router";
import Initial from "../views/ManageAccountView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "startup",
      component: Initial,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/create-account",
      name: "create-account",
      component: () => import("../views/CreateAccountView.vue"),
    },
    {
      path: "/login-existent",
      name: "login-existent",
      component: () => import("../views/LoginExistingView.vue"),
    },
    {
      path: "/events",
      name: "events",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Events.vue"),
    },
    {
      path: "/users",
      name: "Users",
      component: () => import("../views/Users.vue"),
    },
    {
      path: "/myfriends",
      name: "My Friends",
      component: () => import("../views/MyFriends.vue"),
    },
    {
      path: "/notifications",
      name: "Notifications",
      component: () => import("../views/Notifications.vue"),
    },
    {
      path: "/usr-profile",
      name: "usr-profile",
      component: () => import("../views/UserProfile.vue"),
    },
    {
      path: "/my-profile",
      name: "my-profile",
      component: () => import("../views/MyProfile.vue"),
    },
    {
      path: "/stats",
      name: "stats",
      component: () => import("../views/StatsView.vue"),
    },
    {
      path: "/myschedule",
      name: "My Schedule",
      component: () => import("../views/TimelineEvents.vue"),
    },
    {
      path: "/createEvent",
      name: "createEvent",
      component: () => import("../views/CreateEventsView.vue"),
    },
    {
      path: "/joinEvent",
      name: "joinEvent",
      component: () => import("../views/JoinEventsView.vue"),
    },
    {
      path: "/modify-event",
      name: "Modify Event",
      component: () => import("../views/ModificarEventsView.vue"),
    },
    {
      path: "/modify-profile",
      name: "ModifyProfile",
      component: () => import("../views/ModifyProfile.vue"),
    },
    {
      path: "/comment",
      name: "comment",
      component: () => import("../views/CommentsView.vue"),
    },
  ],
});

export default router;
