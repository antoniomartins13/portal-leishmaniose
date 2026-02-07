import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePermission } from '../hooks/usePermission';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const { hasRole } = usePermission();

    // Fecha dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        navigate('/');
    };

    const canAccessAdmin = user && (hasRole('admin') || hasRole('gestor') || hasRole('pesquisador'));

    return (
        <header className="bg-teal-700 text-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                            <span className="text-teal-700 font-bold text-xl">L</span>
                        </div>
                        <span className="text-xl font-bold">Portal da Leishmaniose</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-teal-200 font-medium transition-colors">
                            Início
                        </Link>
                        <Link to="/notificar" className="hover:text-teal-200 font-medium transition-colors">
                            Notificar um Caso
                        </Link>
                        <Link to="/painel" className="hover:text-teal-200 font-medium transition-colors">
                            Painel
                        </Link>
                        <Link to="/noticias" className="hover:text-teal-200 font-medium transition-colors">
                            Notícias
                        </Link>
                        <Link to="/sobre" className="hover:text-teal-200 font-medium transition-colors">
                            Sobre a Doença
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            /* Dropdown do usuário logado */
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-md transition-colors font-medium"
                                >
                                    <User size={18} />
                                    <span className="max-w-32 truncate">{user.name}</span>
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        {canAccessAdmin && (
                                            <Link
                                                to="/admin/grupos"
                                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                <Settings size={16} />
                                                <span>Painel Admin</span>
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            <span>Sair</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Botão Entrar para usuário não logado */
                            <Link
                                to="/login"
                                className="flex items-center space-x-1 bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-md transition-colors font-medium"
                            >
                                <User size={18} />
                                <span>Entrar</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden pt-4 pb-2 space-y-3 border-t border-teal-600 mt-3">
                        <Link
                            to="/"
                            className="block py-2 hover:text-teal-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Início
                        </Link>
                        <Link
                            to="/notificar"
                            className="block py-2 hover:text-teal-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Notificar um Caso
                        </Link>
                        <Link
                            to="/painel"
                            className="block py-2 hover:text-teal-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Painel
                        </Link>
                        <Link
                            to="/noticias"
                            className="block py-2 hover:text-teal-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Notícias
                        </Link>
                        <Link
                            to="/sobre"
                            className="block py-2 hover:text-teal-200 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sobre a Doença
                        </Link>

                        {/* Mobile - User Section */}
                        <div className="border-t border-teal-600 pt-3 mt-3">
                            {user ? (
                                <>
                                    <div className="flex items-center space-x-2 py-2 text-teal-200">
                                        <User size={18} />
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                    {canAccessAdmin && (
                                        <Link
                                            to="/admin/grupos"
                                            className="flex items-center space-x-2 py-2 hover:text-teal-200 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Settings size={18} />
                                            <span>Painel Admin</span>
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center space-x-2 py-2 text-red-300 hover:text-red-200 transition-colors w-full"
                                    >
                                        <LogOut size={18} />
                                        <span>Sair</span>
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block py-2 hover:text-teal-200 transition-colors font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Entrar
                                </Link>
                            )}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
