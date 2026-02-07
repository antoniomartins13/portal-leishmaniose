import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-teal-800 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Portal da Leishmaniose</h3>
                        <p className="text-teal-100 text-sm">
                            Uma iniciativa para monitoramento e controle da Leishmaniose no Brasil.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/sobre" className="text-teal-100 hover:text-white transition-colors">
                                    Sobre a Doença
                                </Link>
                            </li>
                            <li>
                                <Link to="/notificar" className="text-teal-100 hover:text-white transition-colors">
                                    Notificar um Caso
                                </Link>
                            </li>
                            <li>
                                <Link to="/painel" className="text-teal-100 hover:text-white transition-colors">
                                    Painel Público
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Informações</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/noticias" className="text-teal-100 hover:text-white transition-colors">
                                    Notícias
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-teal-100 hover:text-white transition-colors">
                                    Publicações
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-teal-100 hover:text-white transition-colors">
                                    Materiais Educativos
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contato</h3>
                        <p className="text-teal-100 text-sm">
                            contato@portalleishmaniose.gov.br
                            <br />
                            Tel: (61) 3333-4444
                        </p>
                    </div>
                </div>

                <div className="border-t border-teal-700 mt-8 pt-6 text-center text-sm text-teal-200">
                    <p>© 2023 Portal da Leishmaniose. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
