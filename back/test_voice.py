from elevenlabs import ElevenLabs

# Clé API ElevenLabs
API_KEY = "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"

# Initialiser l'instance ElevenLabs
api = ElevenLabs(api_key="sk_d80a27eab7b64170ba9ee3853eb02eb67d264ff4d7761feb")

try:
    # Récupérer toutes les voix
    available_voices = api.voices.get_all().voices

    # Parcourir et afficher les voix disponibles
    for voice in available_voices:
        print(f"Nom : {voice.name}, ID : {voice.voice_id}")
except Exception as e:
    print(f"Erreur lors de la récupération des voix : {e}")
