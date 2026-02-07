import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <Link
                            to="/login"
                            className="flex items-center space-x-1 bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-md transition-colors font-medium"
                        >
                            <User size={18} />
                            <span>Entrar</span>
                        </Link>
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
                        <Link
                            to="/login"
                            className="block py-2 hover:text-teal-200 transition-colors font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Entrar
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
