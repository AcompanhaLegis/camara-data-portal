<script setup lang="ts">
import { computed } from "vue";
import { IDeputado, IGabinete, IUltimoStatus } from "@/types/IDeputado";
import { Tag } from "primevue";

interface SocialNetworksRender {
    icon: string;
    label: string;
    value: string;
}

const props = defineProps<{
    deputado: Partial<IDeputado>;
}>();

const socialNetworks = computed((): SocialNetworksRender[] => {
    return [
        { label: "Facebook", icon: "pi pi-facebook", value: props.deputado.redeSocial?.find(item => item.includes("facebook")) || "" },
        { label: "WhatsApp", icon: "pi pi-whatsapp", value: props.deputado.redeSocial?.find(item => item.includes("whatsapp")) || "" },
        { label: "Telegram", icon: "pi pi-telegram", value: props.deputado.redeSocial?.find(item => item.includes("telegram")) || "" },
        { label: "LinkedIn", icon: "pi pi-linkedin", value: props.deputado.redeSocial?.find(item => item.includes("linkedin")) || "" },
        { label: "Instagram", icon: "pi pi-instagram", value: props.deputado.redeSocial?.find(item => item.includes("instagram")) || "" },
        { label: "Twitter", icon: "pi pi-twitter", value: props.deputado.redeSocial?.find(item => item.includes("twitter")) || "" },
        { label: "X.com", icon: "pi pi-twitter", value: props.deputado.redeSocial?.find(item => item.includes("x.com")) || "" },
        { label: "YouTube", icon: "pi pi-youtube", value: props.deputado.redeSocial?.find(item => item.includes("youtube")) || "" },
        { label: "TikTok", icon: "pi pi-tiktok", value: props.deputado.redeSocial?.find(item => item.includes("tiktok")) || "" },
    ].filter((item) => item.value);
});
</script>

<template>
    <section class="w-full flex flex-col gap-10 lg:flex-row items-center md:items-start dark:bg-slate-800">
        <figure class="flex-shrink-0">
            <img class="h-60 w-auto ring-1 ring-slate-700 rounded" :src="props.deputado.ultimoStatus?.urlFoto"
                :alt="`Foto de ${props.deputado.nomeCivil}`" />
        </figure>

        <div class="w-full">
            <div class="flex flex-col gap-2">
                <h1 class="overflow-hidden text-blue-500 md:text-2xl text-xl mb-4 text-wrap">{{ props.deputado.nomeCivil
                    }}</h1>
                <section class="flex flex-row flex-wrap gap-4 items-center">
                    <p>{{ props.deputado.ultimoStatus?.siglaPartido }} / {{ props.deputado.ultimoStatus?.siglaUf }}</p>
                    <Tag class="text-sm"
                        :severity="props.deputado.ultimoStatus?.situacao === 'Exercício' ? 'success' : 'danger'"
                        :value="`Situação: ${props.deputado.ultimoStatus?.situacao} (${props.deputado.ultimoStatus?.condicaoEleitoral})`">
                    </Tag>
                </section>

                <section class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                    <div class="flex flex-row gap-2 items-center">
                        <i class="pi pi-envelope" role="presentation"></i>
                        <a v-if="props.deputado.ultimoStatus?.email"
                            :href="`mailto:${props.deputado.ultimoStatus?.email}`"
                            class="text-blue-500 hover:underline">
                            {{ props.deputado.ultimoStatus?.email }}
                        </a>
                        <span v-else class="text-gray-500">Email não disponível</span>
                    </div>

                    <div class="flex flex-row gap-2 items-center">
                        <i class="pi pi-phone" role="presentation"></i>
                        <span v-if="props.deputado.ultimoStatus?.gabinete.telefone">
                            {{ props.deputado.ultimoStatus?.gabinete.telefone }}
                        </span>
                        <span v-else class="text-gray-500">Telefone não disponível</span>
                    </div>
                </section>

                <section class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
                    <div class="flex flex-row gap-2 items-center">
                        <i class="pi pi-globe" role="presentation"></i>
                        <span v-if="props.deputado.urlWebsite">{{ props.deputado.urlWebsite }}</span>
                        <span v-else class="text-gray-500">Website não disponível</span>
                    </div>
                    <div class="flex flex-row gap-2 items-center">
                        <i class="pi pi-building" role="presentation"></i>
                        <span>{{ props.deputado.ultimoStatus?.gabinete?.predio }}, {{
                            props.deputado.ultimoStatus?.gabinete?.andar }}º andar, Sala {{
                                props.deputado.ultimoStatus?.gabinete?.sala }}</span>
                    </div>
                </section>

                <section class="mt-6 w-full">
                    <div class="flex flex-row gap-10 w-full items-baseline">
                        <template v-for="network in socialNetworks" :key="network.label">
                            <a v-if="network.value" :href="network.value" target="_blank">
                                <i :class="network.icon" :aria-label="network.label"
                                    :style="{ fontSize: '1.5rem' }"></i>
                            </a>
                            <span v-else class="text-gray-500">{{ network.label }} não disponível</span>
                        </template>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>