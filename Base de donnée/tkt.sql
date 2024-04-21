-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : dim. 21 avr. 2024 à 20:24
-- Version du serveur : 5.7.39
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tkt`
--

-- --------------------------------------------------------

--
-- Structure de la table `affectations`
--

CREATE TABLE `affectations` (
  `id_utilisateurs` int(11) NOT NULL COMMENT 'utilisateur affecté a une mission',
  `id_missions` int(11) NOT NULL COMMENT 'id de la mission affecté',
  `date_jour` date NOT NULL COMMENT 'date du jour de l''affectations',
  `est_valide` tinyint(4) DEFAULT '0' COMMENT '1 =mission finis ,\r\n0 = missions pas finis',
  `date_prise_de_poste` datetime DEFAULT NULL COMMENT 'date de la prise de service d''un utilisateur sur une mission',
  `commentaires` text COMMENT 'l''utilisateur peut laisser ou non un commentaire '
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `affectations`
--

INSERT INTO `affectations` (`id_utilisateurs`, `id_missions`, `date_jour`, `est_valide`, `date_prise_de_poste`, `commentaires`) VALUES
(1, 1, '2024-04-25', 0, NULL, NULL),
(2, 3, '2023-05-16', 1, NULL, NULL),
(2, 5, '2024-06-12', 1, NULL, NULL),
(1, 3, '2024-04-18', 1, NULL, NULL),
(1, 3, '0000-00-00', 1, NULL, NULL),
(4, 2, '2024-04-19', 0, NULL, NULL),
(4, 3, '2024-04-19', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `attractions`
--

CREATE TABLE `attractions` (
  `id_attraction` int(11) NOT NULL,
  `numero` int(11) DEFAULT NULL,
  `nom` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL COMMENT 'chemin d''accès à l''image de l''attraction',
  `description` text NOT NULL,
  `taille_minimum` int(11) DEFAULT NULL COMMENT 'la taille requise pour participer à une attractions exemple faire minimem 130 cm pour participé a tels  manège',
  `taille_maximum` int(11) DEFAULT NULL,
  `id_themes` int(11) NOT NULL COMMENT 'id du thème de manège',
  `peur_sur_le_parc` tinyint(1) NOT NULL,
  `noel_gaulois` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `attractions`
--

INSERT INTO `attractions` (`id_attraction`, `numero`, `nom`, `image`, `description`, `taille_minimum`, `taille_maximum`, `id_themes`, `peur_sur_le_parc`, `noel_gaulois`) VALUES
(1, 36, 'La tour de Numérobis', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/numerobis-min-1.jpg.webp?itok=LAz8HI82', 'Au-delà des apparences, découvrez le génie insoupçonné de Numérobis ! Après une ascension vertigineuse de 40 mètres, vous serez récompensés par une vue panoramique exceptionnelle, vous permettant même depuis l’Égypte d’admirer une vue sur la Gaule. Et voilà que l’attraction se met à tourner, vous permettant de profiter du paysage sous tous ses angles. Et pour ce qui est de la descente, ne vous en faites pas, elle s’effectue en douceur, parole de Numérobis !', 120, NULL, 1, 0, 0),
(2, 38, 'Tonnerre 2 Zeus', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/header-t2z_0.jpg.webp?itok=BPAeS_4s', 'Au programme : une bosse inclinée à 90°, des virages à grande vitesse, quatorze « airtimes » (moments où la vitesse fait décoller les passagers de leur siège), un tunnel avec des effets spéciaux lumineux, ou encore les derniers wagons inversés afin de vivre l’attraction à l’envers.', 120, NULL, 1, 0, 0),
(3, 39, 'La galère', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/la-galere-1_0.jpg.webp?itok=tZ5UJprx', 'À bord de ce bateau-balançoire, les vagues sont vos pires ennemies. A priori, pas de naufrage en vue mais ça tangue dangereusement. En avant, en arrière, en avant, en arrière… Mais que faites-vous dans cette galère ?', 120, NULL, 1, 0, 0),
(4, 42, 'Toutatis', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/toutatis-attraction_0.jpg.webp?itok=kDlIDdVz', 'Montez à bord d’une attraction unique au monde. Avec ses 110 km/h et ses 51 mètres de haut, Toutatis est l’attraction la plus rapide de France ! Et comme le Dieu Gaulois voit les choses en gros, il s’offre également le record du monde « d’airtimes » sur un grand huit en acier (le moment où l’on décolle de son siège) : 23 fois ! Cramponnez-vous à vos casques !', 130, NULL, 1, 0, 0),
(8, 44, 'Goudurix', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/hiiboux-231_0_0.jpg.webp?itok=-_7yTh3B', 'RDV en zone Viking pour débuter une ascension vertigineuse jusqu’à une hauteur équivalente à 12 étages. La vue sur le Parc est exceptionnelle, enfin si vous arrivez à garder les yeux ouverts malgré les pointes à 90 km/h et les loopings… L’attraction est accessible aux familles et enfants les plus aventuriers, avec une taille minimum d’1m40.', 140, NULL, 1, 0, 0),
(7, 41, 'La trace du Hourra', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/ast_0141_0_0.jpg.webp?itok=X4paiYG8', 'Situé dans la zone Gaule du Parc, la Trace du Hourra vous propose un parcours en 3 étapes : le Virage de l’Aurochs, la spirale du fossile et la double défense du mammouth. C’est l’un des bobsleighs les plus hauts du monde et les plus rapides d’Europe. Hip Hip Hip !', 130, NULL, 1, 0, 0),
(5, 40, 'Les chaises volantes', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/chaises-volantes_0.jpg.webp?itok=YChAMhrP', 'Installés sur nos chaises volantes à 10m de hauteur, découvrez une sensation unique de légèreté et de liberté ! Quand le mouvement s’accélère, que les chaises s’inclinent et que vos pieds quittent le sol, ce n’est plus une attraction, c’est de la haute voltige !', 120, NULL, 1, 0, 0),
(6, 43, 'Oziris', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/oziris_miniature_0_0.png.webp?itok=yCcSR8-k', 'Lancés à pleine vitesse à 40 m de hauteur sur ces montagnes russes inversées, vous enchaînez les loopings et vrilles au cœur du Parc. Le ciel ne va peut-être pas vous tomber sur la tête mais vous risquez quand même de voir quelques étoiles !', 130, NULL, 1, 0, 0),
(9, 45, 'Le cheval de troie', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/12525222_10156428667240258_4415093661025838435_o_0-1.jpg.webp?itok=MgjWBvgL', 'Rejoignez la partie grecque du Parc Astérix pour prendre place à bord du Cheval de Troie. Virevoltant dans les airs à plus de 12 m de hauteur, ce drôle de tapis volant va vous rendre complètement marteau. Parole d’athlète Romain !', 140, NULL, 1, 0, 0),
(10, NULL, 'Le tombeau des Dieux ', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/maison-hantee-tombeau-des-dieux-parc-asterix-pslp.jpg.webp?itok=LRzs_gMc', 'Bienvenue dans le Tombeau des Dieux, où reposent les âmes les plus maléfiques de l\'histoire d\'Egypte. Condamnés à l\'enfer éternel, les dieux Sobek et Horus seront prêts à tout pour mettre le chaos dans votre esprit.\r\nAlors ? Qui aura assez de courage pour survivre aux 9 épreuves de l\'enfer ?\r\nDéconseillée au moins de 16 ans.', NULL, NULL, 1, 1, 0),
(11, NULL, 'Catacombes ', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/a_guisiano_2.jpg.webp?itok=0dS9xYvd', 'Catacombes : monstres, squelettes, cadavres en décomposition, rien ne sera épargné aux téméraires partis découvrir le fin fond des catacombes ! Même les visiteurs les plus courageux seront pris par la peur en traversant les tunnels et autres salles ténébreuses, où l’horreur n’attend que vous. Il est fortement conseillé aux moins de 16 ans de ne pas tenter le grand frisson.', NULL, NULL, 1, 1, 0),
(12, NULL, 'La colère D’anubis ', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/pslp-2014-123.jpg.webp?itok=1P9_hsyb', 'À l\'occasion d\'une exposition spéciale, le musée du Havre reçoit une collection d\'Égypte antique. Malheureusement, pendant l\'inventaire, certains esprits contrariés ont été libérés.\r\nPénétrez dans les lieux à vos risques et périls et restez sur vos gardes : nul ne sait comment ils réagiront à cet affront.\r\nDéconseillé au moins de 12 ans.', NULL, NULL, 1, 1, 0),
(13, 25, 'Chez Gyrofolix ', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/chez-gyrofolixparc-asterix.jpg.webp?itok=Rco1sqZe', 'Amis Gaulois, prenez place !Voici l’ingénieuse attraction, chez Gyrofolix, qui a de quoi vous donner le tournis avec ses 4 nacelles tournoyantes. Vu d’en bas, il est facile de se laisser hypnotiser par cette imposante structure. Pourtant, il vous faudra garder tous vos esprits pour surmonter ce challenge familial et gagner la bénédiction de Toutatis.', 120, NULL, 4, 0, 0),
(14, 33, 'La revanche des pirates – Le Grand Splatch', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/la-revanche-des-pirates-grand-splatch-parc-asterix.jpg.webp?itok=wmsqV4wF', 'Au programme : une cascade de pièges redoutables élaborés par Barbe Rouge pour se venger des Gaulois. Soyez prêts ! Entre catapultes, filets et harponnages... Il faudra faire preuve d’adresse et de courage pour ne pas faire naufrage. Une chose est sûre, tout l’équipage ressortira éclaboussé et hilare de cette folle aventure.', 130, NULL, 4, 0, 0),
(15, 21, 'SOS Tournevis', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/sos-numerobis-1_0.jpg.webp?itok=1sl1Yxxc', 'Rendez-vous dans la zone égyptienne du Parc pour embarquer à bord du train SOS Tournevis. Montées, descentes, virages serrés, vitesse … sur cette montagne russe aux wagonnets de bois, tout est réuni pour vous faire vous écrouler de rire !', 120, NULL, 4, 0, 0),
(16, 22, 'Les Chaudrons', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/les-chaudrons.jpg.webp?itok=stu5GNcD', 'Au début, vous vous sentez tout petit. Obélix est tombé dans une de ces marmites, autant dire qu\'elles sont grosses (mais on n\'insinue rien du tout quant au poids de notre livreur de menhirs). Ensuite, vous commencez à ressentir les effets étranges de la potion : tête qui tourne, euphorie, rires incontrôlés... C\'est magique !', 120, NULL, 4, 0, 0),
(17, 23, 'La Petite Tempête ', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/la-petite-tempete-1-2.jpg.webp?itok=1XRVhxku', 'Les petits moussaillons se mettent à la barre de leurs bateaux pour affronter la tempête. Montées, descentes : difficile de naviguer sur une mer aussi déchaînée ! Les bateaux tournoient à une vitesse folle. Heureusement, Obélix est là pour vous surveiller et s\'assurer que tout ira bien !', 120, NULL, 4, 0, 0),
(18, 20, 'Attention Menhir ! ', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/attention-menhir.jpg.webp?itok=_JeJWLLc', 'Attention Menhir est le premier film vidéo en 4D produit par les Studios Idéfix. Projeté dans le nouveau cinéma dynamique du Parc, plongez en famille dans le quotidien mouvementé de vos héros. Bruits, tremblements, odeurs, eau, vent… l’immersion est totale.', 110, NULL, 4, 0, 0),
(19, 24, 'Les Espions de César', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/espions-de-cesar.jpg.webp?itok=nsD_49oU', 'Installez-vous dans l’un des chars à pédales du circuit en monorail des Espions de César pour surveiller Panoramix. Vous allez découvrir que le vieil homme est encore très rapide. Il ne va pas falloir pédaler trop dans la choucroute !', 130, NULL, 4, 0, 0),
(20, 27, 'Pégase Express', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/pegase-express-parc-asterix_0.jpg.webp?itok=7Whf5otv', 'Accessible depuis la gare Montparnoss, dans la zone grecque du Parc, le Pégase express, vous conduit à grand fracas à travers les cités mythiques d’Olympie, Lutèce ou Alexandrie, jusqu’au temple de la dangereuse Méduse. Ne soyez pas pétrifié. Au moindre danger, le train s\'élancera dans une marche arrière unique en Europe.', 130, NULL, 4, 0, 0),
(21, 35, 'L\'Aventure Astérix', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/aventure-asterix_0.jpg.webp?itok=J4x1i6r6', 'Immersive, l’Aventure Astérix vous livre tous les secrets de fabrication des personnages de l’irréductible village gaulois et de leurs légendaires ennemis. Et avec nos vidéos interactives, vous pourrez même apprendre à dessiner vos personnages préférés !', NULL, NULL, 4, 0, 0),
(22, 28, 'L’Oxygénarium', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/oxygenarium-1_0.jpg.webp?itok=uys3m9hw', 'Montez tout près de la cime des arbres pour prendre un grand bol d\'air frais. Votre cerveau, mieux oxygéné, pourra alors bien apprécier la descente de 195 mètres dans un gigantesque toboggan. À couper le souffle ! ', 130, NULL, 4, 0, 0),
(23, 30, 'Le Vol d’Icare', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/icare_cambon_2017-2020_1.jpg.webp?itok=UuTD7MUn', 'Rejoignez vite la partie Grecque du Parc pour embarquer à bord du Vol d’Icare, notre montagne russe astronomique. Pas de risque de vous brûler les ailes mais, avec des montées, virages et descentes à 10 m de haut et 42 km/h, c’est le frisson assuré.', 130, NULL, 4, 0, 0),
(24, 31, 'L’Hydre de Lerne', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/lhydre-de-lerne-1-1.jpg.webp?itok=99flESz_', 'Il ne fallait pas avoir froid aux yeux pour affronter l\'hydre de Lerne, un monstre dangereux à 7 têtes. Mais maintenant, c\'est votre tour. Après vous avoir coincé entre ses tentacules, l\'hydre vous soulève et vous fait tournoyer pour vous étourdir... Vraiment pas facile, la vie de demi-dieu !', 130, NULL, 4, 0, 0),
(25, 15, 'Epidemais Croisière', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/epidemais%20croisi%C3%A8re%20%281%29.jpg.webp?itok=pjLsZSjU', 'Amarrés dans la zone “Bienvenue chez les Gaulois”, les bateaux d’Epidemaïs vous emmènent faire un tour du village à la rencontre de vos héros préférés. Une balade en douceur et en musique, jalonnée de surprises. Là, droit devant, ce ne serait pas Cléopâtre ? Durant la période de Noël Gaulois, l\'attraction ferme ses portes à la tombée de la nuit.', 120, NULL, 4, 0, 0),
(26, 16, 'La Rivière D’Elis', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/img_1622_0_0_0.jpg.webp?itok=D3Yi1ncz', 'Comme Astérix et Obélix en leur temps, partez pour la Grèce Antique, à la rencontre des personnages mythologiques et des Dieux grecs. Tranquillement installé dans votre bateau, longez les jardins méditerranéens d\'Elis et plongez dans un univers plein de magie.', 120, NULL, 4, 0, 0),
(27, 17, 'Les Pe&ts Drakkars', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/petits-drakkars_0.jpg.webp?itok=uJq274-p', 'Vikings en herbe, cette attraction est faite pour vous ! Bâbord, tribord, affrontez les mers tumultueuses et tenez le cap. À la fin de ce périple, vous aurez énormément d\'aventures à raconter et vous ferez forcément des jaloux… Un vrai pirate !', 120, NULL, 4, 0, 0),
(28, 18, 'Les Chevaux du Roy', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/pa-001-dsc_6450_1_0.jpg.webp?itok=1cS1mc-a', 'Dans ce magnifique carrousel à deux étages, les chevaux de bois mènent la danse et ramènent petits et grands dans le temps. Au moyen-âge, les Gaulois ne manquaient jamais une occasion de s\'amuser : blasons médiévaux et enseignes sont détournés, revus et corrigés pour votre plus grand plaisir.', 120, NULL, 4, 0, 0),
(29, 19, 'Le Carroussel de César', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/le-caroussel-de-cesar_0_0.jpg.webp?itok=YjKpYxEB', 'Choisissez votre monture : à cheval, dans la culotte d\'Obélix ou à dos de légionnaires, l\'important c\'est de se tenir prêt pour le départ. Combien de tour va faire ce carrousel ? C\'est César qui décide !', 120, NULL, 4, 0, 0),
(30, 37, 'Discobélix', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/discob%C3%A9lix%20noel_0.jpg.webp?itok=9cpKvaml', 'Tout le monde le sait, Obélix est tombé dans la marmite de potion quand il était petit… et ça l’a doté d’une force légendaire. Quand il décide de lancer un disque géant, celui-ci tourne, tourne, tourne et ne s\'arrête plus, créant un mouvement perpétuel presque divin. Embarquez pour un voyage… surhumain !', 120, NULL, 4, 0, 0),
(31, 32, 'Menhir Express', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/menhir_cambon_2017-2020_3.jpg.webp?itok=ybDkH40a', 'La tournée de livraison commence dans la zone Gaule du Parc. Tourbillons et roulis, on vous prévient c’est assez agité. Gare à la chute ! Celle qu’on vous réserve risque bien d’étancher votre soif d’aventure !', 130, NULL, 4, 0, 0),
(32, 34, 'Romus et Rapidus', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/romus_cambon_2017-2020_4_0.jpg.webp?itok=WOgnMMvV', 'Envie de voyage ? Départ imminent pour Rome. Toutefois, préparez-vous à être un peu chahuté dans vos bouées. Des Gaulois ont piégé cette jolie balade, qui va vite se transformer en douche pour les quelques courageux qui s\'y essaient. Fous rires et éclaboussures garantis !', 140, NULL, 4, 0, 0),
(33, NULL, 'La forêt d’idéfix', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/la-foret-didefix.jpg.webp?itok=wdAS_pOd', 'Lors de la saison Peur sur le Parc, la Forêt d\'Idéfix se transforme avec des décors drôlement terrifiants.\nDans la Forêt d’Idéfix, les plus petits pourront arpenter un parcours aux allures de jardin vivant. La verdure sera mise à l’honneur à travers des créatures plus vraies que nature !', NULL, NULL, 4, 1, 0),
(34, 33, 'Les jardins merveilleux du Père Noel', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/les-jardins-merveilleux-du-pere-noel.jpg.webp?itok=bvuOLLcQ', 'Du 23 décembre au 7 janvier, le Parc Astérix sort les guirlandes et les cadeaux lumineux. Découvrez tous les mystères des jardins merveilleux du Père Noël. Votre périple débute dans Le Bois Enchanté : la faune et la flore de l’endroit sont si mystérieuses que vous pourriez être tenté de rester des heures à les contempler ! Laissez-vous hypnotiser par les daims majestueux ou par les champignons géants illuminés de mille couleurs, même quitte à perdre toute notion du temps. Les feuilles de gui seront un excellent prétexte pour donner un baiser à votre Falbala. Le voyage continue dans La Vallée Glacée : c’est très vivant par ici ! Les bonhommes de neige ne vous ont pas attendu pour s’adonner à une formidable bataille de boules de neige. Mettez-vous à couvert derrière l’un des colossaux cristaux éparpillés sur le champ de bataille, ou bien tentez d’apprivoiser la licorne pour poursuivre plus facilement votre chemin ! Gauloises, Gaulois, pour conclure la randonnée merveilleuse, rendez-vous au Village du Père Noël. C’est ici que les cadeaux s’entassent avant une grande distribution dans toute la Gaule. Les bonhommes en pain d’épices travaillent de concert avec les lutins pour vous offrir des fêtes inoubliables. D’ailleurs, les rennes sont déjà amarrés au-dessus des rapides de Romus et Rapidus et prêts au décollage !', NULL, NULL, 4, 0, 1),
(35, 46, 'Tous en piste ! Le village de la glisse', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/tous-en-piste-parc-asterix-3.jpg.webp?itok=UOT0zJpB', 'Ça va glisser cet hiver au Parc Astérix ! Dans un village couvert, chaussez vos patins et préparez-vous à tournoyer ! Deux patinoires accessibles dès 5 ans Des pistes de glisse Le Jardin des glaces, réservé aux enfants (accompagnés de leur parents) Patins gratuits, port de gants conseillé sur la patinoire.', NULL, NULL, 4, 0, 1),
(36, 48, 'Mission Perdue', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/mission-perdue-parc-asterix-2_0.jpg.webp?itok=1hll26SM', 'Une expérience 3D pour des sensations uniques. ', NULL, NULL, 4, 0, 1),
(37, 14, 'Aire de jeux du Sanglier d\'Or', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/sanglier-dor-parc-asterix.jpg.webp?itok=502MATgx', 'Les petits Gaulois peuvent se préparer aux grands défis du dieu TOUTATIS !\r\nPour cela, un entraînement intensif les attend, leur permettant de développer leur sens de l’observation, leur agilité et leur force pour trouver toutes les médailles qui se cachent dans le parcours de cette aire de jeux semée d’embûches.\r\nLeur permettant sans nul doute de devenir de légendaires combattants admirés dans toute la Gaule !', NULL, NULL, 3, 0, 0),
(38, 1, 'Le Mini Carroussel', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/mini-carrousel.jpg.webp?itok=t7SjGORe', 'Ce mini-carrousel va ravir les plus petits. Cheval, cygne, chameau, carrosse coloré : il y en a pour tous les petits Gaulois ! Après quelques tours, ils deviennent de vrais chevaliers, princesses, soldats ou aventurières. Un rêve éveillé.', NULL, NULL, 3, 0, 0),
(39, 2, 'Les Petites Chaises Volantes', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/petites%20chaises%20volantes_0.jpg.webp?itok=5Zwyplq1', 'À bord des Petites Chaises Volantes, nos petits Gaulois vont se transformer en voltigeurs professionnels. Sont-ils prêts à goûter à cet agréable sentiment de liberté ? Suspendus dans les airs, ils vont vite le savoir !', NULL, NULL, 3, 0, 0),
(40, 3, 'L\'Escadrille des As', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/L%27Escadrille%20des%20As_0.jpg.webp?itok=7e80jxPg', 'Rendez-vous à l’aérodrome de la Zone Vikings pour faire décoller vos petits pilotes intrépides ! Sur l’escadrille des As, ce sont eux qui choisissent l’altitude de leur avion en tirant sur le manche !', NULL, NULL, 3, 0, 0),
(41, 4, 'Lavomatix', 'https://www.parcasterix.fr/sites/default/files/styles/attraction_list_experience/public/images/attractions/haut/lavomatix_0.jpg.webp?itok=AGTxobaE', 'Rejoignez la zone Gauloise pour découvrir ce carrousel pas comme les autres. Bringuebalés dans des baquets à lessive, vos Petitbonums, même lessivés, vont en redemander ! Qui a dit que la lessive était réservée aux parents ? Au Parc Astérix, on lave son linge en famille ! Petits et grands Gaulois sont les bienvenus dans l’attraction !', NULL, NULL, 3, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `avertissements`
--

CREATE TABLE `avertissements` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `id_niveaux` int(11) NOT NULL,
  `id_utilisateurs` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `avertissements`
--

INSERT INTO `avertissements` (`id`, `message`, `id_niveaux`, `id_utilisateurs`) VALUES
(1, 'essssaaaaaaiiiiii', 23333, 2);

-- --------------------------------------------------------

--
-- Structure de la table `equipes`
--

CREATE TABLE `equipes` (
  `id` int(11) NOT NULL,
  `libelle` varchar(150) NOT NULL,
  `description` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `equipes`
--

INSERT INTO `equipes` (`id`, `libelle`, `description`) VALUES
(1, 'Equipe technique', 'Maintenance des attractions'),
(2, 'Equipe accueil ', 'Accueil des visiteurs'),
(3, 'Equipe commerce', 'Conseiller vendeur billetterie, Vendeur conseil, Manager boutiques');

-- --------------------------------------------------------

--
-- Structure de la table `metiers`
--

CREATE TABLE `metiers` (
  `id` int(11) NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `role` text NOT NULL,
  `id_equipes` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `metiers`
--

INSERT INTO `metiers` (`id`, `libelle`, `description`, `role`, `id_equipes`) VALUES
(1, 'Agent d’accueil et d’animation', 'L’agent d’accueil et d’animation est un poste essentiel dans l’expérience gauloise des visiteurs car c’est souvent celui-ci qui sera le premier et le dernier contact du visiteur.', 'L\'agent souhaite la bienvenue aux visiteurs, vérifie les billets d\'entrée, le dépôt et retrait d\'effets personnels à la consigne.', 2),
(4, 'Technicien de réseaux hydrauliques', 'Le technicien de maintenance hydraulique est un technicien spécialisé dans le traitement de l’eau et l’entretien des installations aquatiques. ', 'La journée est donc rythmée par des interventions de plomberie, de tuyauterie, de nettoyage des bassins, entretien du réseau d’eau afin d’assurer la qualité de l’eau disponible dans l’ensemble du Parc.', 1),
(5, 'Technicien de maintenance restauration', 'Le technicien de maintenance restauration est le couteau suisse de la restauration. ', 'Il assure l’entretien préventif et curatif du matériel de restauration comme les fours, la plomberie des plonges, … Il gère aussi le stock de pièces détachées et conseille les restaurateurs du Parc quant à la bonne utilisation et à l’entretien du matériel.', 1),
(6, 'Technicien de maintenance pôle hôtelier', 'S’il y a la moitié d’une panne ou d’un problème technique, c’est le technicien de maintenance pôle hôtelier qu’on appelle à la rescousse !', 'Il intervient pour des dépannages, des diagnostics de panne, des remises en état notamment pour des travaux de menuiserie, serrurerie, électronique, signalétique, peinture…\r\n\r\nDe temps à autre, le technicien prend également soin des espaces verts. Après les interventions il pense aussi à rédiger des comptes rendus d’intervention pour faciliter le travail de ses collègues.', 1),
(7, 'Adjoint au responsable de la maintenance attraction', 'Être technicien de maintenance, d’habitude, c’est dans les usines ou autres grosses industries. Il s’agit souvent de réparer des machines, des chaînes de production… mais ici c’est totalement autre chose ! ', 'On vous propose d’être un des gardiens du bon fonctionnement de nos attractions et donc d’être le garant de l’amusement de milliers de visiteurs ! ça vous branche plus que les unités compactes, bras de taraudage et autres tours à métaux ?\r\n\r\nVoici ce qu’est le quotidien de nos techniciens de maintenance attractions : ils veillent au bon fonctionnement des attractions afin de garantir leur ouverture au public, il s’agit alors de multiplier les contrôles, les vérifications, aussi bien électroniques que mécaniques. . Mieux vaut prévenir que guérir ! Alors la part belle du quotidien est faite à la maintenance dite préventive, cela permet d’anticiper les pannes qui au fil du temps pourraient devenir de plus en plus gênantes.', 1),
(8, 'Electrotechnicien', 'Être électrotechnicien c’est un savant mélange entre électricien et technicien. ', 'L’électrotechnicien effectue des travaux de maintenance à la fois curative et préventive sur les machines produisant les effets (sonores, lumineux, olfactifs etc.) du Parc. Il faut aussi être à l’affût de toutes les pannes et savoir les hiérarchiser afin d’établir la liste des interventions prioritaires. Il en va du bon fonctionnement du Parc ainsi que de l’immersion du public !', 1),
(9, 'Technicien en signalétique', 'Vous aimez restaurer des panneaux, en créer de nouveaux ? Protéger et poser des supports de communication ? ', 'Ce métier de maintenance est aussi bien technique que créatif. Le technicien en signalétique travaille en atelier, conçoit les fichiers, les patrons et autres maquettes sur Mac puis les produit, il suit donc l’avancée de ses projets et panneaux de A à Z, de la conception à la pose… sans oublier l’entretien !', 1),
(10, 'Accessoiriste', 'Être accessoiriste au Parc Astérix c’est participer à rendre l’endroit le plus immersif possible, c’est donc avoir le sens du détail qui rendra encore plus réel le décor ou qui fera sourire pour la référence à la BD. ', 'Pour être accessoiriste, il faut donc transformer les idées en objets 3D, ce qui demande d’être à la fois ingénieux et pratique. C’est cela la beauté du métier : créer, donner vie à des objets qui n’existent que dans l’imagination ou sur le papier.\r\n\r\nDans la production d’accessoires, il faut également penser à respecter un certain cahier des charges et la charte graphique afin que l’objet, une fois terminé, corresponde bien au besoin exprimé.', 1),
(11, 'Peintre en bâtiment', 'L’avantage du métier de peintre c’est que les rénovations sont variées et à l’intérieur comme à l’extérieur !', 'Le peintre en bâtiment prépare et nettoie les surfaces et les supports sur lesquels il appliquera la peinture. Cela signifie non seulement des travaux de peinture mais aussi d’enduit.', 1),
(12, 'Agent de maintenance', 'Être agent de maintenance technique c’est devenir le couteau-suisse du Parc', 'Réalisation de petits travaux de voirie, de réseaux, de dallage ; pose de revêtements, participation à la maçonnerie, réalisation d’enduit intérieur, extérieur, participation à la construction d’éléments de décor, dépannage de serrures, l’agent de maintenance est sur tous les fronts. L’avantage ? Aucune de ses journées ne se ressemblent et il acquiert au fil des missions toujours plus de compétences et de polyvalence.', 1),
(13, 'Conseiller vendeur billetterie', 'Le conseiller vendeur billetterie a un vrai métier d’écoute, c’est de son attention et de sa perception du besoin du client qu’il parvient à dégager la meilleure offre possible pour répondre audit besoin. C’est aussi de cette écoute que découle la conversion des demandes en objectifs remplis. ', 'Le conseiller vendeur billetterie travaille aussi bien pour la clientèle française que pour la clientèle étrangère. Il instruit les commandes et garantit le suivi administratif de vos dossiers (fax, mails, courriers). Il assure la gestion des clients au quotidien et les fidélise en leur garantissant un niveau d’informations précis sur les offres et services.', 3),
(14, 'Chargé de Back Office', 'Être chargé de « back office » cela veut surtout dire travailler au centre de contacts, dans le service réservation. ', 'Le chargé de back office assure le suivi administratif des dossiers des clients. Mais avant cela, il s’agit de répondre au téléphone, saisir les réservations et saisir les paiements sur le logiciel de réservation. \r\n\r\nQui dit réservation dit parfois annulation, alors le chargé de Back office travaille aussi à la régularisation des dossiers, les modifications, traite les litiges courriers et éventuellement les remboursements.', 3),
(15, 'Vendeur Conseil', 'Vous avez toujours voulu être aux petits soins pour vos clients ? Être vendeur conseil au Parc Astérix est peut-être le métier qui vous correspond. Voilà à quoi ressemblent les journées d’un vendeur conseil. ', 'Avant chaque nouvelle journée, il assure la propreté du point de vente afin de travailler dans de bonnes conditions. Il accueille les clients avec le sourire, il gère aussi les temps forts de la journée et l’effervescence des visiteurs. Il conseille du mieux possible chaque client et n’hésite pas à mettre en avant les offres et lesproduits de sa boutique.\r\n\r\nIl organise également le point de vente et son bon fonctionnement : réception des commandes, vérification des stocks, étiquetage et mise en rayon des produits.\r\n\r\nToujours dans un seul but : la satisfaction des clients !', 3),
(16, 'Manager Boutiques', 'C’est bien plus un métier de management que celui de manager boutique car celui-ci anime et organise le travail de son équipe. ', 'Le Manager Boutiques intègre les nouveaux arrivants, organise leur formation, prépare les plannings tout en organisant quotidiennement sa boutique. \r\n\r\nEn plus de superviser les caisses, le manager passe les commandes à l’entrepôt et apporte son soutien aux équipes. Il porte un  regard stratégique sur la journée car c’est lui qui surveille les indicateurs permettant d’atteindre les objectifs fixés.', 3),
(17, 'Assistant Manager Boutiques', 'Travailler en Boutiques c’est être un acteur clé de l’expérience du visiteur. Il faut donc, en étroite collaboration avec le manager de la boutique, se poser en véritable moteur afin d’animer et de fédérer l’équipe. ', 'L’assistant Manager boutiques participe donc au bon déroulement de la journée tout en veillant à la satisfaction de la clientèle. \r\n\r\nL’assistant Manager Boutiques a aussi une fonction de formateur, en effet, il manage, forme et évalue au quotidien une équipe. Il lui apporte également une aide technique concernant les procédures et la vente des produits. Il suit de près le flux des marchandises et contrôle l’état des caisses, effectue les prélèvements et organise les changements de caissiers.', 3);

-- --------------------------------------------------------

--
-- Structure de la table `missions`
--

CREATE TABLE `missions` (
  `id` int(11) NOT NULL,
  `libelle` text NOT NULL,
  `description` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `missions`
--

INSERT INTO `missions` (`id`, `libelle`, `description`) VALUES
(1, 'Entretien des attractions', 'Effectuer la maintenance et le nettoyage régulier des attractions pour assurer leur bon fonctionnement.'),
(2, 'Accueil des visiteurs', 'Accueillir et orienter les visiteurs à leur arrivée au parc, fournir des informations sur les attractions et les activités.'),
(3, 'Gestion des files d\'attente', 'Organiser et gérer les files d\'attente pour assurer un flux de visiteurs fluide et une expérience agréable.'),
(4, 'Surveillance de la sécurité', 'Veiller à la sécurité des visiteurs en surveillant les attractions et en intervenant en cas d\'incident ou d\'urgence.'),
(5, 'Promotion des événements', 'Promouvoir les événements spéciaux et les spectacles du parc pour attirer plus de visiteurs et enrichir leur expérience.'),
(6, 'Préparation des spectacles', 'Participer à la préparation des spectacles en aidant à la mise en place des décors, des costumes et des équipements nécessaires.'),
(7, 'Restauration des espaces verts', 'Entretenir et restaurer les espaces verts du parc, y compris la tonte de l\'herbe, la taille des arbres et l\'arrosage des plantes.'),
(8, 'Gestion des stocks et approvisionnement', 'Gérer les stocks de fournitures et d\'équipements nécessaires au fonctionnement quotidien du parc, ainsi que les commandes et les livraisons.'),
(9, 'Coordination des équipes', 'Coordonner et diriger les équipes de travail pour assurer une communication efficace et une collaboration harmonieuse entre les différents services.'),
(10, 'Évaluation et amélioration des services', 'Évaluer régulièrement les services offerts aux visiteurs, recueillir leurs feedbacks et proposer des améliorations pour enrichir leur expérience au parc.');

-- --------------------------------------------------------

--
-- Structure de la table `niveaux`
--

CREATE TABLE `niveaux` (
  `id` int(11) NOT NULL,
  `libelle` varchar(150) NOT NULL,
  `description` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `niveaux`
--

INSERT INTO `niveaux` (`id`, `libelle`, `description`) VALUES
(1, 'Information', 'Notification générale concernant le parc.'),
(2, 'Avertissement', 'Avertissement sur une situation potentielle ou inhabituelle.'),
(3, 'Maintenance', 'Annonce de travaux de maintenance prévus ou d\'entretien périodique.'),
(4, 'Urgence', 'Situation d\'urgence nécessitant une action immédiate pour garantir la sécurité des visiteurs.');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `libelle`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `themes`
--

CREATE TABLE `themes` (
  `id` int(11) NOT NULL,
  `libelle` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `themes`
--

INSERT INTO `themes` (`id`, `libelle`) VALUES
(1, 'Sensations fortes'),
(2, 'Toutes les attractions'),
(3, 'Petits Gaulois'),
(4, 'Toute la famille'),
(5, 'Filotomatix');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `code_postal` varchar(150) NOT NULL,
  `ville` varchar(150) NOT NULL,
  `adresse` varchar(150) NOT NULL,
  `id_roles` int(11) NOT NULL,
  `id_metiers` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `prenom`, `nom`, `email`, `password`, `code_postal`, `ville`, `adresse`, `id_roles`, `id_metiers`) VALUES
(2, 'Marie', 'Durand', 'admin.admin@gmail.com', 'admin', '69000', 'Lyone', '10 avenue des Fleurs', 2, 2),
(3, 'Pierre', 'Martine', 'pierre.martin@email.com', 'motdepasse3', '33000', 'Bordeaux', '5 rue Sainte-Catherine', 1, 3),
(4, 'Sophie', 'Lefebvre', 'sophie.lefebvre@email.com', 'motdepasse4', '31000', 'Toulouse', '20 rue de la République', 1, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `affectations`
--
ALTER TABLE `affectations`
  ADD PRIMARY KEY (`id_utilisateurs`,`id_missions`,`date_jour`),
  ADD KEY `fk_missions` (`id_missions`);

--
-- Index pour la table `attractions`
--
ALTER TABLE `attractions`
  ADD PRIMARY KEY (`id_attraction`),
  ADD KEY `fk_themes` (`id_themes`);

--
-- Index pour la table `avertissements`
--
ALTER TABLE `avertissements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_niveaux` (`id_niveaux`),
  ADD KEY `fk_utilisateurs` (`id_utilisateurs`);

--
-- Index pour la table `equipes`
--
ALTER TABLE `equipes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `metiers`
--
ALTER TABLE `metiers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_equipes` (`id_equipes`);

--
-- Index pour la table `missions`
--
ALTER TABLE `missions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `niveaux`
--
ALTER TABLE `niveaux`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_roles` (`id_roles`),
  ADD KEY `fk_metiers` (`id_metiers`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `attractions`
--
ALTER TABLE `attractions`
  MODIFY `id_attraction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `avertissements`
--
ALTER TABLE `avertissements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `equipes`
--
ALTER TABLE `equipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `metiers`
--
ALTER TABLE `metiers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `niveaux`
--
ALTER TABLE `niveaux`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `themes`
--
ALTER TABLE `themes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
