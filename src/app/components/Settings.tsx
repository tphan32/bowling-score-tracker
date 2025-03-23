import { Player } from "../types";
import Button from "./Button";

interface SettingsProps {
  onStart: (e: React.FormEvent<HTMLFormElement>) => void;
  onAddPlayer: () => void;
  onReset: () => void;
  players: Player[];
  disabled?: boolean;
}

const Settings: React.FC<SettingsProps> = ({
  players,
  onStart,
  onReset,
  onAddPlayer,
  disabled = false,
}) => {
  return (
    <form
      role="form"
      onSubmit={onStart}
      className="flex flex-col border-solid border-2 border-gray-600 rounded-lg p-5 mb-16"
    >
      <h2 className="text-2xl font-semibold text-gray-700">Setup</h2>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          {players.map((player, index) => {
            const playerNumber = index + 1;
            return (
              <div key={player.id}>
                <label
                  htmlFor={`name${playerNumber}`}
                >{`Name of player ${playerNumber}: `}</label>
                <input
                  type="text"
                  className="border-solid border-2 border-gray-600 rounded-lg px-1 disabled:opacity-50"
                  required
                  id={`name${playerNumber}`}
                  name={`name${playerNumber}`}
                  disabled={disabled}
                />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col items-end">
          <Button
            onClick={onAddPlayer}
            label="Add more player"
            disabled={players.length >= 5 || disabled}
          />
          <div className="opacity-50 text-sm">
            *Only up to 5 players allowed
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        <Button type="submit" label="Start" disabled={disabled} />
        <Button type="button" label="Reset" onClick={onReset} />
      </div>
    </form>
  );
};

export default Settings;
