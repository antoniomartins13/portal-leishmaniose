import { NavLink, Outlet } from 'react-router-dom';
import { Users, Shield, ChevronLeft, BadgeAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuItem {
    path: string;
    label: string;
    icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
    {
        path: '/admin/usuarios',
        label: 'Usuários',
        icon: <Users size={20} />,
    },
    {
        path: '/admin/grupos',
        label: 'Grupos',
        icon: <Shield size={20} />,
    },
    {
        path: '/admin/sintomas',
        label: 'Sintomas',
        icon: <BadgeAlert size={20} />,
    },
];

export const AdminLayout: React.FC = () => {
    return (
        <div className="flex min-h-[calc(100vh-140px)]">
            {/* Sidebar */}
            <aside className="w-64 bg-teal-800 text-white flex-shrink-0">
                <div className="p-4">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold">Painel Admin</h2>
                        <p className="text-teal-200 text-sm mt-1">Gerenciamento do sistema</p>
                    </div>

                    {/* Menu Items */}
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            // Grupos deve ficar ativo em /admin e /admin/grupos
                            const isGruposItem = item.path === '/admin/grupos';

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => {
                                        const shouldBeActive = isActive ||
                                            (isGruposItem && window.location.pathname === '/admin');
                                        return `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${shouldBeActive
                                            ? 'bg-teal-600 text-white'
                                            : 'text-teal-100 hover:bg-teal-700'
                                            }`;
                                    }}
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* Back to site link */}
                    <div className="mt-8 pt-4 border-t border-teal-700">
                        <Link
                            to="/"
                            className="flex items-center space-x-2 text-teal-200 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={18} />
                            <span className="text-sm">Voltar ao site</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
};
