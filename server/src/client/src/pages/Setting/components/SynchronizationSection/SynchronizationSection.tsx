import { toast } from '@baejino/ui';
import { useEffect, useState } from 'react';

import { Button } from '~/components/shared';
import { socket } from '~/socket';

import styles from './SynchronizationSection.module.scss';

export interface SynchronizationSectionProps {
  onSyncMusic: (force: boolean) => Promise<void>;
}

export const SynchronizationSection = ({ onSyncMusic }: SynchronizationSectionProps) => {
  const [progressMessage, setProgressMessage] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    socket.on('sync-music', (serverMessage: string | 'done' | 'error') => {
      if (serverMessage === 'done' || serverMessage === 'error') {
        if (serverMessage === 'done') {
          toast('Completed sync music');
        } else if (serverMessage === 'error') {
          toast('Error while sync music');
        }
        
        setIsSyncing(false);
        setTimeout(() => {
          setProgressMessage('');
        }, 1000);
      } else {
        setIsSyncing(true);
      }
      setProgressMessage(serverMessage);
    });

    return () => {
      socket.off('sync-music');
    };
  }, []);

  const handleSync = async (force: boolean) => {
    setIsSyncing(true);
    await onSyncMusic(force);
  };

  return (
    <>
      <h3>Synchronization</h3>
      <div className={styles.settingItem}>
        <p>Sync music from your server</p>
        <p className={styles.description}>Update your local music library with the latest content from the server</p>
        
        {progressMessage && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressIndicator} ${isSyncing ? styles.animating : ''}`}
              ></div>
            </div>
            <p className={styles.progressMessage}>{progressMessage}</p>
          </div>
        )}
        
        <div className={styles.buttonContainer}>
          <Button 
            onClick={() => handleSync(false)}
            style={{ opacity: isSyncing ? 0.5 : 1, pointerEvents: isSyncing ? 'none' : 'auto' }}
          >
            Sync
          </Button>
          <Button 
            onClick={() => handleSync(true)}
            style={{ opacity: isSyncing ? 0.5 : 1, pointerEvents: isSyncing ? 'none' : 'auto' }}
          >
            Force Sync
          </Button>
        </div>
      </div>
    </>
  );
};
