export function addProfileToken(profile) {
    localStorage.setItem('NetoSocial', JSON.stringify(profile));
}

export function storagePermission() {
    try {
        if (JSON.parse(localStorage.getItem('NetoSocial'))) {
            return true
        } else {
            return false
        }
      } catch (e) {
        throw new Error('Invalid data');
      }
}

export function storageLoadToken() {
    try {
        return JSON.parse(localStorage.getItem('NetoSocial'))
      } catch (e) {
        throw new Error('Invalid data');
      }
}

export function removeProfile() {
    localStorage.removeItem('NetoSocial')
}