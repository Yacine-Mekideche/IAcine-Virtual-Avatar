from elevenlabs import ElevenLabs

# Clé API ElevenLabs
API_KEY = "api_key"

# Initialiser l'instance ElevenLabs
api = ElevenLabs(api_key="api_key")

try:
    # Récupérer toutes les voix
    available_voices = api.voices.get_all().voices

    # Parcourir et afficher les voix disponibles
    for voice in available_voices:
        print(f"Nom : {voice.name}, ID : {voice.voice_id}")
except Exception as e:
    print(f"Erreur lors de la récupération des voix : {e}")
