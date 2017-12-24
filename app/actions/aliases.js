import { aliases as AppAliases } from './AppActions';
import { aliases as PlaylistAliases } from './PlaylistActions';
import { aliases as SubscriptionAliases } from './SubscriptionActions';

export default {
  ...AppAliases,
  ...PlaylistAliases,
  ...SubscriptionAliases
};