import http from "./http.utils";
import { API_V1_BASE_URL, API_V2_BASE_URL } from "../constants/config";
import { authStore, networkStore, notificationsStore } from "../stores";
import { get, toUpper } from 'lodash/fp';
import { getService } from '../utils/angular.utils';

export function fetch({ method = "GET", url, isAbsolute, data, label, apiVersion = 2, notifications = {} }) {
  networkStore.startNetwork(label);

  const baseUrl = apiVersion === 2 ? API_V2_BASE_URL : API_V1_BASE_URL;

  return http[toUpper(method)](isAbsolute ? url : `${baseUrl}/${url}`, data, authStore.accessToken)
    .then(response => {
      networkStore.endNetwork(label);

      if (notifications.success) {
        notificationsStore.addNotification({ type: 'success', title: notifications.success });
      }

      return response.data;
    })
    .catch(error => {
      networkStore.endNetwork(label);

      const statusCode = get('response.status', error);
      if (statusCode === 429) {
        const modalFactory = getService('modalFactory');

        if (modalFactory) {
          modalFactory.rateLimitReached();
        }
      } else if (notifications.error) {
        notificationsStore.addNotification({ type: 'error', title: notifications.success });
      }

      return Promise.reject(error);
    });
}
