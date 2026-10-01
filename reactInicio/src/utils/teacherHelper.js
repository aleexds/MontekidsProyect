export const TEACHERS_MAP = {
  semillitas: {
    id: 't1',
    classroom: 'Aula Semillitas (2 a 4 años)',
    name: 'Docente Karina S.',
    shortName: 'Karina S.',
    firstName: 'Karina',
    initials: 'KS',
    role: 'Guía AMI Titular • Aula Semillitas',
    email: 'karina.semillitas@montekids.edu',
    avatar: '👩‍🏫',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyd0Rz-BQi70CfH7chrpPK_zMWnk4VwmWUiqguBJqRfju-QARjzHZ8dlrkRBlTmljgtHgwjcxj48py0UhA2ngwPWS0lxlc-Rbgzix9_l9-kbNURRRyd7Mv5Zx6GzjgOePrqzx20LCUME7JNnj4-ysKzI4MHeukPHNg5UPJEzjub_50rHjDZ_BnN9-ohq47XKx2r0EypyFm_veULijLBSv9waf3XgqW3VKhCmMD2icUJvkNcWGQPzoguQ'
  },
  exploradores: {
    id: 't2',
    classroom: 'Aula Exploradores (4 a 6 años)',
    name: 'Docente Esteban M.',
    shortName: 'Esteban M.',
    firstName: 'Esteban',
    initials: 'EM',
    role: 'Guía AMI Titular • Aula Exploradores',
    email: 'esteban.exploradores@montekids.edu',
    avatar: '👨‍🏫',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120'
  },
  creadores: {
    id: 't3',
    classroom: 'Aula Creadores (6 a 8 años)',
    name: 'Docente Marcela R.',
    shortName: 'Marcela R.',
    firstName: 'Marcela',
    initials: 'MR',
    role: 'Guía AMI Titular • Aula Creadores',
    email: 'marcela.creadores@montekids.edu',
    avatar: '👩‍🏫',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120'
  }
};

/**
 * Retorna el docente asignado según el aula o la edad del hijo/a del usuario.
 * @param {Object} user - Objeto de usuario activo desde AuthContext o localStorage.
 * @returns {Object} Objeto con la información del docente.
 */
export function getTeacherForUser(user) {
  if (!user) {
    try {
      const saved = localStorage.getItem('activeUser');
      if (saved) {
        user = JSON.parse(saved);
      }
    } catch {
      // fallback
    }
  }

  const classroom = user?.child?.classroom || '';
  const age = Number(user?.child?.age) || 3;
  const clsLower = String(classroom).toLowerCase();

  if (clsLower.includes('creadores') || age >= 6) {
    return TEACHERS_MAP.creadores;
  }
  if (clsLower.includes('exploradores') || (age >= 4 && age < 6)) {
    return TEACHERS_MAP.exploradores;
  }
  return TEACHERS_MAP.semillitas;
}
