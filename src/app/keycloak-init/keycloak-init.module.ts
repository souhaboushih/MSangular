import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { KeycloakInitOptions } from 'keycloak-js';

export function initializeKeycloak(keycloak: KeycloakService, router: Router): () => Promise<any> {
  return async () => {
    const initOptions: KeycloakInitOptions = {
      onLoad: 'login-required',
      flow: 'standard',
      checkLoginIframe: false,
    };

    await keycloak.init({
      config: {
        realm: 'Angular-Project',
        url: 'http://localhost:8080/',
        clientId: 'Plateforme-education',
      },
      initOptions,
      enableBearerInterceptor: true,
    });

    await checkRolesAndRedirect(keycloak, router);
  };
}

async function checkRolesAndRedirect(keycloak: KeycloakService, router: Router): Promise<void> {
  const isAuthenticated = await keycloak.isLoggedIn();

  if (isAuthenticated) {
    const token: string | null = await keycloak.getToken();

    if (token) {
      const roles: string[] = extractRolesFromToken(token);
      const userId = extractUserIdFromToken(token);

      // Ajout d'une redirection par défaut si le rôle n'est pas reconnu
      let redirectPath = '/users';

      if (roles.includes('admin_role')) {
        redirectPath = '/users';
      } else if (roles.includes('enseignant_role')) {
        redirectPath = `/home-enseignants/${userId}`;
      } else if (roles.includes('etudiant_role')) {
        redirectPath = '/eleve';
      }

      router.navigate([redirectPath]);
    }
  }
}

function extractRolesFromToken(token: string): string[] {
  const decodedToken: any = decodeToken(token);
  return decodedToken?.realm_access?.roles || [];
}

function extractUserIdFromToken(token: string): string | null {
  const decodedToken: any = decodeToken(token);
  return decodedToken?.sub || null;
}

function decodeToken(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
}
