import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('granted'); // Não é mais relevante

  // Toasts visuais no site
  const showNotification = (title: string, options?: { body?: string; type?: 'success' | 'error' | 'info' }) => {
    const message = options?.body ? `${title}\n${options.body}` : title;
    if (options?.type === 'error') {
      toast.error(message);
    } else if (options?.type === 'info') {
      toast(message);
    } else {
      toast.success(message);
    }
  };

  const showLoginNotification = (userName: string) => {
    showNotification('🐾 Login realizado!', { body: `Bem-vindo de volta, ${userName}! Você está logado no PetGuard.` });
  };

  const showSignupNotification = (userName: string) => {
    showNotification('🐾 Cadastro realizado!', { body: `Parabéns, ${userName}! Sua conta foi criada com sucesso no PetGuard.` });
  };

  const showLogoutNotification = () => {
    showNotification('🐾 Logout realizado!', { body: 'Você saiu da sua conta. Volte sempre para cuidar dos seus pets!' });
  };

  const showPetAddedNotification = (petName: string) => {
    showNotification('🐾 Pet adicionado!', { body: `${petName} foi adicionado à sua lista de pets com sucesso!` });
  };

  const showPetUpdatedNotification = (petName: string) => {
    showNotification('🐾 Pet atualizado!', { body: `As informações de ${petName} foram atualizadas com sucesso!` });
  };

  const showPetRemovedNotification = (petName: string) => {
    showNotification('🐾 Pet removido!', { body: `${petName} foi removido da sua lista de pets.` });
  };

  return {
    permission,
    showNotification,
    showLoginNotification,
    showSignupNotification,
    showLogoutNotification,
    showPetAddedNotification,
    showPetUpdatedNotification,
    showPetRemovedNotification
  };
}; 