// Configuration TypeORM pour la synchronisation automatique de la base de données
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { join } from 'path';

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User],
  synchronize: process.env.NODE_ENV !== 'production', // Désactivé en production
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  migrationsRun: true, // Exécute les migrations au démarrage
  logging: true,
}); 